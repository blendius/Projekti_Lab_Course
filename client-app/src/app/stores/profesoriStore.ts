import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Profesori } from "../models/profesori";
import { v4 as uuid } from 'uuid';

export default class ProfesoriStore {
   
    professorRegistry= new Map<string, Profesori>();
    selectedProfessor: Profesori | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;


    constructor() {
        makeAutoObservable(this)
    }

    get profesoretByDate(){
        return Array.from(this.professorRegistry.values()).sort((a,b)=>Date.parse(a.dataRegjistrimit)- Date.parse(b.dataRegjistrimit))
        }

    loadProfesoret = async () => {
        try {
            const profesoret = await agent.Profesoret.list();

            profesoret.forEach(profesori => {
                profesori.dataRegjistrimit = profesori.dataRegjistrimit.split('T')[0];
                this.professorRegistry.set(profesori.id,profesori);
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
    selectProfessor = (id: string) => {
        this.selectedProfessor = this.professorRegistry.get(id);
    }

    cancelSelectedProfessor = () => {
        this.selectedProfessor = undefined;
    }
    openForm = (id?: string) => {
        id ? this.selectProfessor(id) : this.cancelSelectedProfessor();
        this.editMode = true;
    }
    closeForm = () => {
        this.editMode = false;
    }

    createProfessor = async (profesori: Profesori) => {
        this.loading = true;
        profesori.id = uuid();
        try {
            await agent.Profesoret.create(profesori);
            runInAction(() => {
                this.professorRegistry.set(profesori.id,profesori)
                this.selectedProfessor = profesori;
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

    updateProfessor = async (profesori: Profesori) => {
        this.loading = true;
        try {
            await agent.Profesoret.update(profesori);
            runInAction(() => {
               this.professorRegistry.set(profesori.id,profesori);
                this.selectedProfessor = profesori;
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
    deleteProfessor = async (id: string) => {
        this.loading = true;
        try {
            await agent.Profesoret.delete(id);
            runInAction(()=>{
               this.professorRegistry.delete(id);
                if (this.selectedProfessor?.id===id) this.cancelSelectedProfessor();
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