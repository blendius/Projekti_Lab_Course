import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Klubi } from "../models/klubi";
import { v4 as uuid } from 'uuid';

export default class KlubiStore {
   
       
    klubiRegistry= new Map<string, Klubi>(); 
    selectedKlubi: Klubi | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;


    constructor() { 
        makeAutoObservable(this)
    } 

    get klubetByDate(){
        return Array.from(this.klubiRegistry.values())
        }

        // ).sort((a,b)=>Date.parse(a.dataRregjistrimit)- Date.parse(b.dataRregjistrimit)

    loadKlubi = async () => {
        try {
            const klubet = await agent.Klubet.list();
          
            klubet.forEach(klubi => {
                
                // klubi.dataRregjistrimit = klubi.dataRregjistrimit.split('T')[0];
                this.klubiRegistry.set(klubi.id,klubi);
            })
            this.setLoadingInitial(false);
        }
        catch (error) {
            console.log(error); 

            this.setLoadingInitial(false);
        }
    }

    
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectKlubi = (id: string) => {
        this.selectedKlubi = this.klubiRegistry.get(id);
    }

    openForm = (id?: string) => {
        id ? this.selectKlubi(id) : this.cancelSelectedKlubi();
        this.editMode = true;
    }
    closeForm = () => {
        this.editMode = false;
    }




    createKlubi = async (klubi: Klubi) => {
        this.loading = true;
        klubi.id = uuid();
        try {
            await agent.Klubet.create(klubi);
            runInAction(() => {
                this.klubiRegistry.set(klubi.id,klubi)
                this.selectedKlubi = klubi;
                this.editMode = false;
                this.loading = false
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })

        }
    }



    
    updateKlubi = async (klubi: Klubi) => {
        this.loading = true;
        try {
            await agent.Klubet.update(klubi);
            runInAction(() => {
               this.klubiRegistry.set(klubi.id,klubi);
                this.selectedKlubi = klubi;
                this.editMode = false;
                this.loading = false

            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })

        }
    }


    cancelSelectedKlubi = () => {
        this.selectedKlubi = undefined;
    }

    deleteKlubi = async (id: string) => {
        this.loading = true;
        try {
            await agent.Klubet.delete(id);
            runInAction(()=>{
               this.klubiRegistry.delete(id);
                if (this.selectedKlubi?.id===id) this.cancelSelectedKlubi();
                this.loading=false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }
}





