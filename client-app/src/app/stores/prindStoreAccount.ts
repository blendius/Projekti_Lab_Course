import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { Parent, ParentFormValues } from "../models/parent";
import { store } from "./store";

export default class PrindStoreAccount {
    prindi: Parent | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.prindi;
    }

    login = async (creds: ParentFormValues) => {
        try {
            const prindi = await agent.AccountPrindi.login(creds);
            store.commonStore.setToken(prindi.token);
            runInAction(() => this.prindi = prindi);
            history.push('./prindiPage');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logoutPrindi = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.prindi = null;
        history.push('/');
    }

    getPrindi = async () => {
        try{
            const prindi = await agent.AccountPrindi.current();
            runInAction(() => this.prindi = prindi);
        }catch(error){
            console.log(error);
        }
    }

    register = async (creds: ParentFormValues) => {
        try {
            await agent.AccountPrindi.register(creds);
            history.push('/adminPage/prinderit');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }
}