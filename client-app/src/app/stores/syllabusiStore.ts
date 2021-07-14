import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { format } from "date-fns";
import { Syllabusi } from "../models/syllabusi";

export default class SyllabusiStore {
    // postimet: syllabusi[] = [];
    syllabusiRegistry = new Map<string, Syllabusi>();
    selectedSyllabusi: Syllabusi | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;


    constructor() {
        makeAutoObservable(this)
    }
    public  getSyllabusiEmri = (id: string) => {
        return this.syllabusiRegistry.get(id)?.emriSyllabusit;
    }
    get syllabusetCount(){
        return this.syllabusiRegistry.size;
    }
    get syllabusetByDate() {
        //this.loadSyllabuset();
        return Array.from(this.syllabusiRegistry.values()).sort((a, b) => a.dataEKrijimit!.getTime() - b.dataEKrijimit!.getTime());
    }
    get groupedSyllabuset(){
        return Object.entries(
            this.syllabusetByDate.reduce((syllabuset,syllabusi) =>{
                const date = format(syllabusi.dataEKrijimit!,'dd MMM yyyy');
                syllabuset[date] = syllabuset[date] ? [...syllabuset[date],syllabusi] :[syllabusi];
                return syllabuset;
            },{} as {[key:string]:Syllabusi[]})
        )
    }

    loadSyllabuset = async () => {
        this.loadingInitial = true;
        try {
            const syllabuset = await agent.Syllabuset.list();

            syllabuset.forEach(syllabusi => {
               this.setSyllabusi(syllabusi);
            })
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);

        }
    }
    loadSyllabusi = async(id:string)=>{
        let syllabusi = this.getSyllabusi(id);
        //console.log(syllabusi);
        if(syllabusi){
            this.selectedSyllabusi=syllabusi;
            return syllabusi;
        }else{
            this.loadingInitial = true;
            try{
                syllabusi = await agent.Syllabuset.details(id);
                this.setSyllabusi(syllabusi);
                runInAction(()=>{
                    this.selectedSyllabusi= syllabusi;
                })
                this.setLoadingInitial(false);
                return syllabusi;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setSyllabusi = (syllabusi:Syllabusi)=>{
        syllabusi.dataEKrijimit = new Date(syllabusi.dataEKrijimit!);
        this.syllabusiRegistry.set(syllabusi.syllabusiId, syllabusi);
    }
    private getSyllabusi = (id:string ) =>{
        return this.syllabusiRegistry.get(id);
    }


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectSyllabusi = (id: string) => {
        this.selectedSyllabusi = this.syllabusiRegistry.get(id);
    }
    cancelSelectedSyllabusi = () => {
        this.selectedSyllabusi = undefined;
    }
    openForm = (id?: string) => {
        id ? this.selectSyllabusi(id) : this.cancelSelectedSyllabusi();
        this.editMode = true;

    }
    closeForm = () => {
        this.editMode = false;
    }
    createSyllabusi = async (syllabusi: Syllabusi) => {
        
        this.loading = true;
        syllabusi.syllabusiId = uuid();
        try {
            await agent.Syllabuset.create(syllabusi);
            runInAction(() => {
                this.syllabusiRegistry.set(syllabusi.syllabusiId, syllabusi);
                this.selectedSyllabusi = syllabusi;
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

    updateSyllabusi = async (syllabusi: Syllabusi) => {
        this.loading = true;
        try {
            await agent.Syllabuset.update(syllabusi);
            runInAction(() => {
                this.syllabusiRegistry.set(syllabusi.syllabusiId, syllabusi);
                this.selectedSyllabusi = syllabusi;
                this.editMode = false;
                this.loading = false;
                // this.postimet.filter(a=>a.id !== syllabusi.id)
                // this.postimet.push(syllabusi)
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    deleteSyllabusi = async (id: string) => {
        this.loading = true;
        try {
            await agent.Syllabuset.delete(id);
            runInAction(() => {
                this.syllabusiRegistry.delete(id);
                if (this.selectedSyllabusi?.syllabusiId === id) this.cancelSelectedSyllabusi();
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