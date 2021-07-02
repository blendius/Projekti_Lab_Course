import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Njoftimi } from "../models/njoftimi";
import {v4 as uuid} from 'uuid';

export default class NjoftimiStore {
    njoftimet: Njoftimi[] = [];
    selectedNjoftimi: Njoftimi | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadNjoftimet = async () => {
        this.setLoadingInitial(true);
        try{
            this.njoftimet = [];
            const njoftimet = await agent.Njoftimet.list();
            njoftimet.forEach(njoftimi => {
                njoftimi.dataEShtimit = njoftimi.dataEShtimit.split('T')[0];
                this.njoftimet.push(njoftimi);
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

    selectNjoftimin = (id: string) => {
        this.selectedNjoftimi = this.njoftimet.find(a => a.njoftimiId == id);
    }

    cancelSelectedNjoftimi = () => {
        this.selectedNjoftimi = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectNjoftimin(id) : this.cancelSelectedNjoftimi();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createNjoftimin = async (njoftimi: Njoftimi) => {
        this.loading = true;
        njoftimi.njoftimiId = uuid();
        try {
            await agent.Njoftimet.create(njoftimi);
            runInAction(() => {
                this.njoftimet.push(njoftimi);
                this.selectedNjoftimi = njoftimi;
                this.editMode = false;
                this.loading= false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateNjoftimin = async (njoftimi: Njoftimi) => {
        this.loading = true;
        try {
            await agent.Njoftimet.update(njoftimi);
            runInAction(() => {
                this.njoftimet = [...this.njoftimet.filter(a => a.njoftimiId !== njoftimi.njoftimiId), njoftimi];
                this.selectedNjoftimi = njoftimi;
                this.editMode = false;
                this.loading = false;
                window.location.reload();
            })
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteNjoftimin = async (id: string) => {
        this.loading = true;
        try {
            await agent.Njoftimet.delete(id);
            runInAction(() => {
                this.njoftimet = [...this.njoftimet.filter(a => a.njoftimiId !== id)];
                if(this.selectedNjoftimi?.njoftimiId === id) this.cancelSelectedNjoftimi();
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