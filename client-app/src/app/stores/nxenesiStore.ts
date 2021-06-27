import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Nxenesi } from "../models/nxenesi";

export default class nxenesiStore {
    // postimet: lenda[] = [];
    nxenesiRegistry = new Map<string, Nxenesi>();
    selectedLenda: Nxenesi | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;


    constructor() {
        makeAutoObservable(this)
    }

    get nxenesitCount() {
        return this.nxenesiRegistry.size;
    }
    
  

    loadNxenesit = async () => {
        this.loadingInitial = true;
        try {
            const nxenesit = await agent.Nxenesit.list();

            nxenesit.forEach(nxenesi => {
                this.setNxenesi(nxenesi);
            })
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);

        }
    }

    private setNxenesi = (nxenes: Nxenesi) => {
        this.nxenesiRegistry.set(nxenes.id, nxenes);
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

}