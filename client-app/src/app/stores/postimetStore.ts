import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Postimi } from "../models/postimi";
import { v4 as uuid } from 'uuid';

export default class PostimiStore {
    // postimet: Postimi[] = [];
    postimiRegistry = new Map<string, Postimi>();
    selectedPostimi: Postimi | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;


    constructor() {
        makeAutoObservable(this)
    }

    get postimetByDate() {
        return Array.from(this.postimiRegistry.values()).sort((a, b) => Date.parse(a.data) - Date.parse(b.data));
    }

    loadPostimet = async () => {
        try {
            const postimet = await agent.Postimet.list();

            postimet.forEach(postimi => {
                postimi.data = postimi.data.split('T')[0];
                //this.postimet.push(postimi);
                this.postimiRegistry.set(postimi.id, postimi);
            })
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);

        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectPostimi = (id: string) => {
        this.selectedPostimi = this.postimiRegistry.get(id);
    }
    cancelSelectedPostimi = () => {
        this.selectedPostimi = undefined;
    }
    openForm = (id?: string) => {
        id ? this.selectPostimi(id) : this.cancelSelectedPostimi();
        this.editMode = true;

    }
    closeForm = () => {
        this.editMode = false;
    }
    createPostimi = async (postimi: Postimi) => {
        this.loading = true;
        postimi.id = uuid();
        try {
            await agent.Postimet.create(postimi);
            runInAction(() => {
                this.postimiRegistry.set(postimi.id, postimi);
                this.selectedPostimi = postimi;
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

    updatePostimi = async (postimi: Postimi) => {
        this.loading = true;
        try {
            await agent.Postimet.update(postimi);
            runInAction(() => {
                this.postimiRegistry.set(postimi.id, postimi);
                this.selectedPostimi = postimi;
                this.editMode = false;
                this.loading = false;
                // this.postimet.filter(a=>a.id !== postimi.id)
                // this.postimet.push(postimi)
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    deletePostimi = async (id: string) => {
        this.loading = true;
        try {
            await agent.Postimet.delete(id);
            runInAction(() => {
                this.postimiRegistry.delete(id);
                if (this.selectedPostimi?.id === id) this.cancelSelectedPostimi();
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