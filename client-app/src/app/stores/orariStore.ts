import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Orari } from "../models/orari";
import { v4 as uuid } from "uuid";

export default class OrariStore {
  oraretRegistry = new Map<string, Orari>();
  selectedOrari: Orari | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get getOraret() {
    return Array.from(this.oraretRegistry.values());
  }

  loadOraret = async () => {
    try {
      const oraret = await agent.Oraret.list();

      oraret.forEach((orari) => {
        this.setOrari(orari);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };
  selectOrari = (id: string) => {
    this.selectedOrari = this.oraretRegistry.get(id);
  };
  cancelSelectedOrari = () => {
    this.selectedOrari = undefined;
  };
  openForm = (id?: string) => {
    id ? this.selectOrari(id) : this.cancelSelectedOrari();
    this.editMode = true;
  };
  closeForm = () => {
    this.editMode = false;
  };
  createOrari = async (orari: Orari) => {
    this.loading = true;
    orari.orariId = uuid();
    try {
      await agent.Oraret.create(orari);
      runInAction(() => {
        this.oraretRegistry.set(orari.orariId, orari);
        this.selectedOrari = orari;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  updateOrari = async (orari: Orari) => {
    this.loading = true;
    try {
      await agent.Oraret.update(orari);
      runInAction(() => {
        this.oraretRegistry.set(orari.orariId, orari);
        this.selectedOrari = orari;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  deleteOrari = async (id: string) => {
    this.loading = true;
    try {
      await agent.Oraret.delete(id);
      runInAction(() => {
        this.oraretRegistry.delete(id);
        if (this.selectedOrari?.orariId === id) this.cancelSelectedOrari();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  loadOrari = async (id: string) => {
    let orari = this.getOrari(id);
    if (orari) {
      this.selectedOrari = orari;
    } else {
      this.setLoadingInitial(true);
      try {
        orari = await agent.Oraret.details(id);
        this.setOrari(orari);
        this.setLoadingInitial(false);
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setOrari = (orari: Orari) => {
    this.oraretRegistry.set(orari.orariId, orari);
  };

  private getOrari = (id: string) => {
    return this.oraretRegistry.get(id);
  };
}
