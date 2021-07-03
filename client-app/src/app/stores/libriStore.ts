import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { Libri } from "../models/libri";

export default class LibriStore {
    //librat: Libri[] = [];
    libriRegistry = new Map<string, Libri>();
    selectedLibri: Libri | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;


    constructor() {
        makeAutoObservable(this)
    }
    get libriByDate() {
        return Array.from(this.libriRegistry.values());
    }


    loadLibrat = async () => {
        this.setLoadingInitial (true);
        try {
            //this.librat = [];
            const librat = await agent.Librat.list();
            librat.forEach(libri => {
                this.libriRegistry.set(libri.id, libri);
               //this.librat.push(libri);
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
    selectLibri = (id: string) => {
        this.selectedLibri = this.libriRegistry.get(id);
    }

    cancelSelectedLibri = () => {
        this.selectedLibri = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectLibri(id) : this.cancelSelectedLibri();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createLibrin = async (libri: Libri, EmriLendes: string) => {
        this.loading = true;
        libri.id = uuid();
        try {
            await agent.Librat.create(libri, EmriLendes);
            runInAction(() => {
                this.libriRegistry.set(libri.id, libri)
                //this.librat.push(libri);
                this.selectedLibri = libri;
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

    updateLibrin = async (libri: Libri) => {
        this.loading = true;
        try {
            await agent.Librat.update(libri);
            runInAction(() => {
                //this.librat = [...this.librat.filter(a => a.id !== libri.id), libri];
                this.libriRegistry.set(libri.id, libri);
                this.selectedLibri = libri;
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
    deleteLibrin = async (id: string) => {
        this.loading = true;
        try {
            await agent.Librat.delete(id);
            runInAction(() => {
                this.libriRegistry.delete(id);
                if (this.selectedLibri?.id === id) this.cancelSelectedLibri();
                // this.loading = false;
                // this.librat = [...this.librat.filter(a => a.id !== id)];
                // if(this.selectedLibri?.id === id) this.cancelSelectedLibri();
                // this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}