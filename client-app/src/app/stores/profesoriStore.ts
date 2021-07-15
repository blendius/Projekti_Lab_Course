import { makeAutoObservable, runInAction, reaction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { Professor, ProfFormValues } from "../models/professor";
import { store } from "./store";
import { history } from "../..";
import CommonStore from "./commonStore";
import { ProfKlasa } from "../models/profKlasa";

export default class ProfesoriStore {
    prof: Professor | null = null;
    professorRegistry = new Map<string, Professor>();
    professorKlasaRegistry = new Map<string, ProfKlasa>();
    selectedProfessor: Professor | undefined = undefined;
    klasaMode = false;
    editMode = false;
    loading = false;
    loadingInitial = false;


    constructor() {
        makeAutoObservable(this);

    }

    get isLoggedIn() {
        return !!this.prof;
    }
    get profesoriCount() {
        return this.professorRegistry.size;
    }

    login = async (creds: ProfFormValues) => {
        try {
            const prof = await agent.AccountProf.login(creds);
            store.commonStore.setToken(prof.token)
            runInAction(() => this.prof = prof);
            history.push('/professorPage/ProfProfili')
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
    getProfFromId = async (id: string) => {
        console.log(id)
        return this.professorRegistry.get(id);
    }

    register = async (creds: ProfFormValues, id: string) => {
        try {
            await agent.AccountProf.register(creds, id);
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
    get profesoretKlasaByDate() {
        return Array.from(this.professorKlasaRegistry.values())
    }

    loadProfesoret = async () => {
        try {
            const profesoret = await agent.Profesoret.list();

            profesoret.forEach(profesori => {
                this.setProfesori(profesori);
            })
            this.setLoadingInitial(false);
        }

        catch (error) {
            console.log(error);

            this.setLoadingInitial(false);
        }

    }

    loadProfesoriKlaset = async (id: string | undefined) => {
        try {
            const klaset = await agent.Profesoret.listKlaset(id);

            klaset.forEach(klasa => {
                this.professorKlasaRegistry.set(klasa.klasaId, klasa);
            })
            this.setLoadingInitial(false);
        }

        catch (error) {
            console.log(error);

            this.setLoadingInitial(false);
        }

    }

    loadProfesori = async (id: string) => {
        let profesori = this.getProfFromId(id);
        console.log(profesori);
        // if (profesori) {
        //     this.selectedProfessor = profesori;
        //     return profesori;
        // } else {
        //     this.loadingInitial = true;
        //     try {
        //         profesori = await agent.Profesoret.details(id);
        //         this.setProfesori(profesori);
        //         runInAction(() => {
        //             this.selectedProfessor = profesori;
        //         })
        //         this.setLoadingInitial(false);
        //         return profesori;
        //     } catch (error) {
        //         console.log(error);
        //         this.setLoadingInitial(false);
        //     }
        // }
    }

    private setProfesori = (profesor: Professor) => {
        profesor.dataRegjistrimit = profesor.dataRegjistrimit!;
        this.professorRegistry.set(profesor.id, profesor);
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

    openAddKlasaForm = (id?: string) => {
        id ? this.selectProfessor(id) : this.cancelSelectedProfessor();
        this.klasaMode = true;
    }
    closeForm = () => {
        this.editMode = false;
    }

    closeAddKlasaForm = () => {

        this.klasaMode = false;
        window.location.reload();

    }

    createProfKlasa = async (profesoriKlasa: ProfKlasa, profId: string | undefined, klasaId: string) => {

        // profId = this.selectedProfessor?.id
        try {
            await agent.Profesoret.createKlasa(profesoriKlasa, profId, klasaId);
            runInAction(() => {
                this.klasaMode = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.klasaMode = false;
            })

        }
    }

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
    };


    deleteKlasaProfessor = async (id: any) => {
        this.loading = true;
        try {
            await agent.Profesoret.deleteKlasa(id);
            runInAction(() => {
                this.professorKlasaRegistry.delete(id);
                if (this.selectedProfessor?.id === id) this.cancelSelectedProfessor();
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    };
    public getEmriProfById = (id: string) => {
        return this.professorRegistry.get(id)?.name;
    };

    
}