import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Lenda } from "../models/lenda";
import { v4 as uuid } from 'uuid';

export default class lendaStore {
    // postimet: lenda[] = [];
    lendaRegistry = new Map<string, Lenda>();
    selectedLenda: Lenda | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;


    constructor() {
        makeAutoObservable(this)
    }

    get lendetByDate() {
        return Array.from(this.lendaRegistry.values()).sort((a, b) => Date.parse(a.dataEShtimit) - Date.parse(b.dataEShtimit));
    }

    loadLendet = async () => {
        this.loadingInitial = true;
        try {
            const lendet = await agent.Lendet.list();

            lendet.forEach(lenda => {
               this.setLenda(lenda);
            })
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);

        }
    }
    loadLenda = async(id:string)=>{
        let lenda = this.getLenda(id);
        //console.log(lenda);
        if(lenda){
            this.selectedLenda=lenda;
            return lenda;
        }else{
            this.loadingInitial = true;
            try{
                lenda = await agent.Lendet.details(id);
                this.setLenda(lenda);
                runInAction(()=>{
                    this.selectedLenda= lenda;
                })
                this.setLoadingInitial(false);
                return lenda;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setLenda = (lenda:Lenda)=>{
        lenda.dataEShtimit = lenda.dataEShtimit.split('T')[0];
        this.lendaRegistry.set(lenda.lendaId, lenda);
    }
    private getLenda = (id:string ) =>{
        return this.lendaRegistry.get(id);
    }


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectLenda = (id: string) => {
        this.selectedLenda = this.lendaRegistry.get(id);
    }
    cancelSelectedLenda = () => {
        this.selectedLenda = undefined;
    }
    openForm = (id?: string) => {
        id ? this.selectLenda(id) : this.cancelSelectedLenda();
        this.editMode = true;

    }
    closeForm = () => {
        this.editMode = false;
    }
    createLenda = async (lenda: Lenda) => {
        
        this.loading = true;
        lenda.lendaId = uuid();
        try {
            await agent.Lendet.create(lenda);
            runInAction(() => {
                this.lendaRegistry.set(lenda.lendaId, lenda);
                this.selectedLenda = lenda;
                this.editMode = false;
                this.loading = false;

            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })

        }
    }

    updateLenda = async (lenda: Lenda) => {
        this.loading = true;
        try {
            await agent.Lendet.update(lenda);
            runInAction(() => {
                this.lendaRegistry.set(lenda.lendaId, lenda);
                this.selectedLenda = lenda;
                this.editMode = false;
                this.loading = false;
                // this.postimet.filter(a=>a.id !== lenda.id)
                // this.postimet.push(lenda)
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    deleteLenda = async (id: string) => {
        this.loading = true;
        try {
            await agent.Lendet.delete(id);
            runInAction(() => {
                this.lendaRegistry.delete(id);
                if (this.selectedLenda?.lendaId === id) this.cancelSelectedLenda();
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}