import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Vleresimi } from "../models/Vleresimi";
import { v4 as uuid } from 'uuid';
import { Nxenesi } from "../models/nxenesi";
import { Familja } from "../models/familja";

export default class VlersimiStore {

    vlersimiRegistry = new Map<string, Vleresimi>();
    vlersimiNgaPrindiRegistry = new Map<string, Vleresimi>();
    nxenesiRegistry = new Map<string, Nxenesi>();
    familjaRegistry = new Array();
    selectedVlersimi: Vleresimi | undefined = undefined;
    selectedNxenesi: Nxenesi | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
    nxensiMode = false;
    disabled = false;

    constructor() {
        makeAutoObservable(this)
    }

    get vlersimietByDate() {
        return Array.from(this.vlersimiRegistry.values()).sort((a, b) => Date.parse(a.dataRegjistrimit) - Date.parse(b.dataRegjistrimit))
    }

    get vlersimiNgaPrindi() {
        return Array.from(this.vlersimiNgaPrindiRegistry.values()).sort((a, b) => Date.parse(a.dataRegjistrimit) - Date.parse(b.dataRegjistrimit))
    }

    loadVleresimet = async (ProfId: string | undefined) => {
        try {
            const vlersimet = await agent.Vleresimet.list(ProfId);

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
    selectNxenesi = (id: string) => {
        this.selectedNxenesi = this.nxenesiRegistry.get(id);
    }

    cancelSelectedVlersimi = () => {
        this.selectedVlersimi = undefined;
    }
    openForm = (id?: string) => {
        id ? this.selectVlersimi(id) : this.cancelSelectedVlersimi();
        this.editMode = true;
    }
    openFormNxenesi = (id: string) => {
        this.selectNxenesi(id)
        this.editMode = true;
    }
    closeForm = () => {
        this.editMode = false;
    }

    createVlersimi = async (vlersimi: Vleresimi, profId: string | undefined, nxenesiId: string | undefined) => {
        this.loading = true;
        vlersimi.vleresimiId = uuid();
        try {
            await agent.Vleresimet.create(vlersimi, profId, nxenesiId);
            runInAction(() => {
                this.vlersimiRegistry.set(vlersimi.vleresimiId, vlersimi)
                this.selectedVlersimi = vlersimi;
                this.editMode = false;
                this.loading = false
                window.location.reload();   
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })

        }
    }

    updateVlersimi = async (vleresimi: Vleresimi, profId: string | undefined, nxenesiId: string | undefined) => {
        this.loading = true;
        try {
            await agent.Vleresimet.update(vleresimi, profId, nxenesiId);
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

    getNxensitByKlasa = async (EmriKlases: string) => {
        try {
            const nxenesit = await agent.Nxenesit.listNxensitByKlasa(EmriKlases);
            console.log(nxenesit);
            nxenesit.forEach(nxenesi => {
                this.nxenesiRegistry.set(nxenesi.id, nxenesi);
            })
            this.nxensiMode = true;
            this.disabled = true
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);

            this.setLoadingInitial(false);
        }
    }
    get NxenesiSortByEmri() {
        return Array.from(this.nxenesiRegistry.values()).sort((a, b) => Date.parse(a.dateOfBirth) - Date.parse(b.dateOfBirth))
    }

    loadVleresimetByNxenesi = async (nxenesiId: string | undefined) => {
        try {
            const vlersimet = await agent.Vleresimet.listNxenesi(nxenesiId);
            console.log(vlersimet);
            vlersimet.forEach(vleresimi => {
                this.vlersimiNgaPrindiRegistry.set(vleresimi.vleresimiId, vleresimi);
            })
            this.setLoadingInitial(false);
        }   

        catch (error) {
            console.log(error);

            this.setLoadingInitial(false);
        }
    }

    loadNxenesiByPrindi = async (prindiId: string | undefined) => {
        const nxenesit = await agent.Vleresimet.listNxenesiByPrindi(prindiId);
        console.log(nxenesit)
        for (var i = 0; i < nxenesit.length; i++) {
            this.familjaRegistry[i] = nxenesit[i];
        }
        this.setLoadingInitial(false);
    }
}



