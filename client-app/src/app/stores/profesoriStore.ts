import { makeAutoObservable, runInAction, reaction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { Professor, ProfFormValues } from "../models/professor";
import { store } from "./store";
import { history } from "../..";
import CommonStore from "./commonStore";

export default class ProfesoriStore {
    prof: Professor | null = null;
    professorRegistry = new Map<string, Professor>();
    selectedProfessor: Professor | undefined = undefined;

    editMode = false;
    loading = false;
    loadingInitial = true;


    constructor() {
        makeAutoObservable(this);
       
    }
  
    get isLoggedIn() {
        return !!this.prof;
    }

    login = async (creds: ProfFormValues) => {
        try {
            const prof = await agent.AccountProf.login(creds);
            store.commonStore.setToken(prof.token)
            runInAction(() => this.prof = prof);
            history.push('/lendet')
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logoutProf = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.prof = null;
        history.push('/')
    }

    getProf = async () => {
        try {
            const prof = await agent.AccountProf.currentProf();
            runInAction(() => this.prof = prof);
        } catch (error) {
            console.log(error);
        }
    }

    register = async (creds: ProfFormValues) => {
        try {
            await agent.AccountProf.register(creds);
            // store.commonStore.setToken(prof.token)
            // runInAction(() => this.prof = prof);
            // history.push('/lendet')
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    updateProfessor = async (profesori: Professor) => {
        this.loading = true;
        try {
            await agent.Profesoret.update(profesori);
            runInAction(() => {
                this.professorRegistry.set(profesori.id, profesori);
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
    get profesoretByDate() {
        return Array.from(this.professorRegistry.values()).sort((a, b) => Date.parse(a.dataRegjistrimit) - Date.parse(b.dataRegjistrimit))
    }

    loadProfesoret = async () => {
        try {
            const profesoret = await agent.Profesoret.list();

            profesoret.forEach(profesori => {
                profesori.dataRegjistrimit = profesori.dataRegjistrimit.split('T')[0];
                this.professorRegistry.set(profesori.id, profesori);
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

    // createProfessor = async (profesori: Profesori) => {
    //     this.loading = true;
    //     profesori.id = uuid();
    //     try {
    //         await agent.Profesoret.create(profesori);
    //         runInAction(() => {
    //             this.professorRegistry.set(profesori.id, profesori)
    //             this.selectedProfessor = profesori;
    //             this.editMode = false;
    //             this.loading = false
    //         })
    //     } catch (error) {
    //         console.log(error);
    //         runInAction(() => {
    //             this.loading = false;
    //         })

    //     }
    // }

    deleteProfessor = async (id: string) => {
        this.loading = true;
        try {
            await agent.Profesoret.delete(id);
            runInAction(() => {
                this.professorRegistry.delete(id);
                if (this.selectedProfessor?.id === id) this.cancelSelectedProfessor();
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