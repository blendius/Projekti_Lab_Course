import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Vleresimi } from "../models/Vleresimi";
import { v4 as uuid } from 'uuid';

export default class VlersimiStore {

    vlersimiRegistry = new Map<string, Vleresimi>();
    selectedVlersimi: Vleresimi | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;


    constructor() {
        makeAutoObservable(this)
    }

    get vlersimietByDate() {
        return Array.from(this.vlersimiRegistry.values()).sort((a, b) => Date.parse(a.dataRegjistrimit) - Date.parse(b.dataRegjistrimit))
    }

    loadVleresimet = async () => {
        try {
            const vlersimet = await agent.Vleresimet.list();

            vlersimet.forEach(vleresimi => {
                vleresimi.dataRegjistrimit = vleresimi.dataRegjistrimit.split('T')[0];
                this.vlersimiRegistry.set(vleresimi.vleresimiId, vleresimi);
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
    selectVlersimi = (id: string) => {
        this.selectedVlersimi = this.vlersimiRegistry.get(id);
    }

    cancelSelectedVlersimi = () => {
        this.selectedVlersimi = undefined;
    }
    openForm = (id?: string) => {
        id ? this.selectVlersimi(id) : this.cancelSelectedVlersimi();
        this.editMode = true;
    }
    closeForm = () => {
        this.editMode = false;
    }

    createVlersimi = async (vlersimi: Vleresimi, profId: string, nxenesiId: string) => {
        this.loading = true;
        vlersimi.vleresimiId = uuid();
        try {
            await agent.Vleresimet.create(vlersimi, profId, nxenesiId);
            runInAction(() => {
                this.vlersimiRegistry.set(vlersimi.vleresimiId, vlersimi)
                this.selectedVlersimi = vlersimi;
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

    updateVlersimi = async (vleresimi: Vleresimi, profId:string, nxenesiId:string) => {
        this.loading = true;
        try {
            await agent.Vleresimet.update(vleresimi,profId,nxenesiId );
            runInAction(() => {
                this.vlersimiRegistry.set(vleresimi.vleresimiId, vleresimi);
                this.selectedVlersimi = vleresimi;
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
    deleteVlersimi = async (id: string) => {
        this.loading = true;
        try {
            await agent.Vleresimet.delete(id);
            runInAction(() => {
                this.vlersimiRegistry.delete(id);
                if (this.selectedVlersimi?.vleresimiId === id) this.cancelSelectedVlersimi();
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