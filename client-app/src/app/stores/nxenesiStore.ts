import { makeAutoObservable, runInAction } from "mobx";
import NxenesiDashboard from "../../features/nxenesit/dashboard/NxenesiDashboard";
import agent from "../api/agent";
import { Nxenesi } from "../models/nxenesi";
import {v4 as uuid} from 'uuid';

export default class NxenesiStore {
    nxenesit: Nxenesi[] = [];
    nxenesiRegistry = new Map<String, Nxenesi>();
    selectedNxenesi: Nxenesi | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
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
        console.log("HEre")
        this.editMode = false;
    }

    createNxenesin = async (nxenesi: Nxenesi) => {
        this.loading = true;
        nxenesi.id = uuid();
        
        console.log("nx", nxenesi)
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
        console.log("nx", nxenesi)
        try {
            await agent.Nxenesit.update(nxenesi);
            runInAction(() => {
                this.nxenesiRegistry.set(nxenesi.id, nxenesi);
                this.selectedNxenesi = nxenesi;
                this.editMode= false;
                this.loading = false;
            })
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
                if(this.selectedNxenesi?.id === id) this.cancelSelectedNxenesi();
                this.loading = false;
            })
        }catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}