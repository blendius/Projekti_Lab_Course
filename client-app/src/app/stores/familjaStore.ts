import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Familja } from "../models/familja";
import { v4 as uuid } from 'uuid';

export default class FamiljaStore {

    familjaRegistry = new Map<string, Familja>();
    selectedFamilja: Familja | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;


    constructor() {
        makeAutoObservable(this)
    }

    get familjetById() {
        return Array.from(this.familjaRegistry.values()).sort((a, b) => a.familjaId.localeCompare(b.familjaId))
    }

    loadFamiljet = async () => {
        try {
            const familjet = await agent.Familjet.list();

            familjet.forEach(familja => {
                // familja.dataRegjistrimit = familja.dataRegjistrimit.split('T')[0];
                this.familjaRegistry.set(familja.familjaId, familja);
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
    selectFamilja = (id: string) => {
        this.selectedFamilja = this.familjaRegistry.get(id);
    }

    cancelSelectedFamilja = () => {
        this.selectedFamilja = undefined;
    }
    openForm = (id?: string) => {
        id ? this.selectFamilja(id) : this.cancelSelectedFamilja();
        this.editMode = true;
    }
    closeForm = () => {
        this.editMode = false;
    }

    createFamilja = async (familja: Familja, prindiId: string, nxenesiId: string) => {
        this.loading = true;
        familja.familjaId = uuid();
        try {
            await agent.Familjet.create(familja, prindiId, nxenesiId);
            runInAction(() => {
                this.familjaRegistry.set(familja.familjaId, familja)
                this.selectedFamilja = familja;
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

    updateFamilja = async (familja: Familja, prindiId: string, nxenesiId: string) => {
        this.loading = true;
        try {
            await agent.Familjet.update(familja, prindiId, nxenesiId);
            runInAction(() => {
                this.familjaRegistry.set(familja.familjaId, familja);
                this.selectedFamilja = familja;
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
    deleteFamilja = async (id: string) => {
        this.loading = true;
        try {
            await agent.Familjet.delete(id);
            runInAction(() => {
                this.familjaRegistry.delete(id);
                if (this.selectedFamilja?.familjaId === id) this.cancelSelectedFamilja();
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