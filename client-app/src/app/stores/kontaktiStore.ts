import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Kontakti } from "../models/kontakti";
import { v4 as uuid } from 'uuid';
import { useStore } from "./store";

export default class KontaktiStore {
    prindiId: string | null = null;
    kontaktiRegistryReply = new Map<string, Kontakti>();
    kontaktiRegistry = new Map<string, Kontakti>();
    selectedKontakti: Kontakti | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
    modalMode=false;


    constructor() {
        makeAutoObservable(this)
    }

    get kontaktetByDate() {
        return Array.from(this.kontaktiRegistry.values()).sort((a, b) => Date.parse(a.dataEDergimit) - Date.parse(b.dataEDergimit))
    }
    get kontaktetReplyByDate() {
        return Array.from(this.kontaktiRegistryReply.values()).sort((a, b) => Date.parse(a.dataEDergimit) - Date.parse(b.dataEDergimit))
    }

    loadKontaktetPrindi = async (id: string | undefined) => {
        try {
            const kontaketet = await agent.Kontaktet.listPrindi(id);

            kontaketet.forEach(kontakti => {
                kontakti.dataEDergimit = kontakti.dataEDergimit.split('T')[0];
                
                if (kontakti.isReply) {
                    this.kontaktiRegistryReply.set(kontakti.kontaktiId, kontakti);
                } else {
                    this.kontaktiRegistry.set(kontakti.kontaktiId, kontakti);
                }
            })
            this.setLoadingInitial(false);
        }

        catch (error) {
            console.log(error);

            this.setLoadingInitial(false);
        }

    }


    loadKontaktetProf = async (email: string | undefined) => {
        try {
            const kontaketet = await agent.Kontaktet.listProf(email);

            kontaketet.forEach(kontakti => {
                kontakti.dataEDergimit = kontakti.dataEDergimit.split('T')[0];

                if (kontakti.isReply) {
                    this.kontaktiRegistryReply.set(kontakti.kontaktiId, kontakti);
                } else {
                    this.kontaktiRegistry.set(kontakti.kontaktiId, kontakti);
                }

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
    selectKontakti = (id: string) => {
        this.selectedKontakti = this.kontaktiRegistry.get(id);
        this.modalMode=true;
    }
    selectKontaktiReply = (id: string) => {
        this.selectedKontakti = this.kontaktiRegistryReply.get(id);
        this.modalMode=true;
    }

    cancelSelectedKontakti = () => {
        this.selectedKontakti = undefined;
        this.modalMode=false;
        window.location.reload();
    }
    openForm = (id?: string) => {
        id ? this.selectKontakti(id) : this.cancelSelectedKontakti();
        this.editMode = true;
    }
    closeForm = () => {
        this.modalMode=false;
        this.editMode = false;
    }

    createKontakti = async (kontakti: Kontakti, profEmail: string | undefined) => {
        this.loading = true;
        kontakti.kontaktiId = uuid();
        try {
            await agent.Kontaktet.create(kontakti, profEmail);
            runInAction(() => {
                
                if (kontakti.isReply) {
                    this.kontaktiRegistryReply.set(kontakti.kontaktiId, kontakti);
                } else {
                    this.kontaktiRegistry.set(kontakti.kontaktiId, kontakti);
                }
                this.selectedKontakti = kontakti;
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

    deleteKotakti = async (id: string) => {
        this.loading = true;
        try {
            await agent.Kontaktet.delete(id);
            runInAction(() => {
                this.kontaktiRegistry.delete(id);
                if (this.selectedKontakti?.kontaktiId === id) this.cancelSelectedKontakti();
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