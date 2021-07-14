import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";

import { v4 as uuid } from "uuid";
import { Aktiviteti } from "../models/Aktiviteti";

export default class AktivitetiStore {
  aktivitetetRegistry = new Map<string, Aktiviteti>();
  selectedAktiviteti: Aktiviteti | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get getAktivitetet() {
    return Array.from(this.aktivitetetRegistry.values());
  }

  loadAktivitetet = async () => {
    try {
      const aktivitetet = await agent.Aktivitetet.list();

      aktivitetet.forEach((aktiviteti) => {
        this.setAktiviteti(aktiviteti);
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
  selectAktiviteti = (id: string) => {
    this.selectedAktiviteti = this.aktivitetetRegistry.get(id);
  };
  cancelSelectedAktiviteti = () => {
    this.selectedAktiviteti = undefined;
  };
  openForm = (id?: string) => {
    id ? this.selectAktiviteti(id) : this.cancelSelectedAktiviteti();
    this.editMode = true;
  };
  closeForm = () => {
    this.editMode = false;
  };
  createAktiviteti = async (aktiviteti: Aktiviteti) => {
    this.loading = true;
    aktiviteti.aktivitetiId = uuid();
    try {
      await agent.Aktivitetet.create(aktiviteti);
      runInAction(() => {
        this.aktivitetetRegistry.set(aktiviteti.aktivitetiId, aktiviteti);
        this.selectedAktiviteti = aktiviteti;
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
  updateAktiviteti = async (aktiviteti: Aktiviteti) => {
    this.loading = true;
    try {
      await agent.Aktivitetet.update(aktiviteti);
      runInAction(() => {
        this.aktivitetetRegistry.set(aktiviteti.aktivitetiId, aktiviteti);
        this.selectedAktiviteti = aktiviteti;
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
  deleteAktiviteti = async (id: string) => {
    this.loading = true;
    try {
      await agent.Aktivitetet.delete(id);
      runInAction(() => {
        this.aktivitetetRegistry.delete(id);
        if (this.selectedAktiviteti?.aktivitetiId === id)
          this.cancelSelectedAktiviteti();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  loadAktiviteti = async (id: string) => {
    let aktiviteti = this.getAktiviteti(id);
    if (aktiviteti) {
      this.selectedAktiviteti = aktiviteti;
    } else {
      this.setLoadingInitial(true);
      try {
        aktiviteti = await agent.Aktivitetet.details(id);
        this.setAktiviteti(aktiviteti);
        this.setLoadingInitial(false);
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setAktiviteti = (aktiviteti: Aktiviteti) => {
    this.aktivitetetRegistry.set(aktiviteti.aktivitetiId, aktiviteti);
  };

  private getAktiviteti = (id: string) => {
    return this.aktivitetetRegistry.get(id);
  };
}
