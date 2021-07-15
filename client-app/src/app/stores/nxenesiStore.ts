import { makeAutoObservable, runInAction } from "mobx";
import NxenesiDashboard from "../../features/nxenesit/dashboard/NxenesiDashboard";
import agent from "../api/agent";
import { Nxenesi } from "../models/nxenesi";
import {v4 as uuid} from 'uuid';
import {Nxenesiuser, NxenesiuserFormValues } from "../models/nxenesiuser";
import { store } from "./store";
import { history } from "../..";
import { convertCompilerOptionsFromJson } from "typescript";

export default class NxenesiStore {
    nxenesi: Nxenesiuser | null = null;
    nxenesiSelected: Nxenesiuser | null = null;
    nxenesiRegistry = new Map<String, Nxenesi>();
    selectedNxenesi: Nxenesi | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        //this.getNxenesi();
        makeAutoObservable(this)
    }
    get isLoggedIn() {
        return !!this.nxenesiSelected;
    }
    get nxenesitCount(){
        return this.nxenesiRegistry.size;
    }

    loginNxenesi = async (creds: NxenesiuserFormValues) => {
        try {
            const nxenesit = await agent.AccountNxenesi.login(creds);
            store.commonStore.setToken(nxenesit.token);
            runInAction(() => this.nxenesiSelected = nxenesit);
            history.push("/nxenesiPage/Profili");
            store.modalStore.closeModal();
        } catch(error) {
            throw error;
        }
    }

    logoutNxenesi = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.nxenesiSelected = null;
        history.push('/');
    }

    getNxenesi = async () => {
        try {
            const nxenesi = await agent.AccountNxenesi.currentNxenesi();
            runInAction(() => this.nxenesi = nxenesi);
        } catch (error) {
            console.log(error);
        }
    }
    getNxenesin = async () => {
      //  console.log("here6")

        try {
           const nxenesit =  await agent.AccountNxenesi.currentNxenesi();
           runInAction(() => this.nxenesiSelected = nxenesit);
         //  console.log("Nxenesit here: ", this.nxenesiSelected)

           history.push("/nxenesiPage/Profili");


        } catch(error) {
            console.log(error);
        }
    }

    get nxenesitByDate() {
        return Array.from(this.nxenesiRegistry.values()).sort((a, b) => Date.parse(a.dateOfBirth) - Date.parse(b.dateOfBirth));
    }

    loadNxenesit = async () => {
        try{
            const nxenesit = await agent.Nxenesit.list();
                nxenesit.forEach(nxenesi => {
                    nxenesi.dateOfBirth = nxenesi.dateOfBirth.split('T')[0];
                    this.nxenesiRegistry.set(nxenesi.id, nxenesi);
                })
                this.setLoadingInitial(false);        
        } catch(error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectNxenesin = (id: string) => {
        this.selectedNxenesi = this.nxenesiRegistry.get(id);
    }
    
    cancelSelectedNxenesi = () => {
        this.selectedNxenesi = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectNxenesin(id) : this.cancelSelectedNxenesi();
        this.editMode = true;
    }

    openForm2 = (id?: string) => {
        id ? this.selectNxenesin(id) : this.cancelSelectedNxenesi();
        this.editMode = true;
    }

    closeForm = () => {
        //console.log("HEre")
        this.editMode = false;
    }

    register = async (creds: NxenesiuserFormValues) => {
        try {
            console.log("creds Nxenesi: ", creds);
            await agent.AccountNxenesi.register(creds);
            //history.push('/adminPage/nxenesit');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }
    createNxenesin = async (nxenesi: Nxenesi) => {
        this.loading = true;
        nxenesi.id = uuid();
        
        //console.log("nx", nxenesi)
        try{
            await agent.Nxenesit.create(nxenesi);
            runInAction(() => {
                this.nxenesiRegistry.set(nxenesi.id, nxenesi);
                this.selectedNxenesi = nxenesi;
                this.editMode= false;
                this.loading = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateNxenesin = async (nxenesi: Nxenesi) => {
        this.loading = true;
        try {
            await agent.Nxenesit.update(nxenesi);
            console.log("nxenesi para update", nxenesi)
            runInAction(() => {
                this.nxenesiRegistry.set(nxenesi.id, nxenesi);
                this.selectedNxenesi = nxenesi;
                this.editMode= false;
                this.loading = false;
                //history.push("/nxenesiPage/Profili");
               // window.location.reload();
            })
            console.log("nxenesi", nxenesi)
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })

        }
    }

    deleteNxenesin = async (id: string) => {
        this.loading = true;
        try{
            await agent.Nxenesit.delete(id);
            runInAction(() => {
                this.nxenesiRegistry.delete(id);
                if(this.nxenesiSelected?.id === id) this.cancelSelectedNxenesi();
                this.loading = false;
            })
        }catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    public getEmriNxenesitById = (id: string) => {
        return this.nxenesiRegistry.get(id)?.fullName;
    };

}