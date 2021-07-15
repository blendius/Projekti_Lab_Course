import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { Salla } from "../models/salla";

export default class SallaStore {
  sallatRegistry = new Map<string, Salla>();
  selectedSalla: Salla | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }
  get sallatByName() {
    return Array.from(this.sallatRegistry.values()).sort((s1, s2) => s1.emriSalles.localeCompare(s2.emriSalles));
  }

  get getSallat() {
    return Array.from(this.sallatRegistry.values());
  }

  loadSallat = async () => {
    try {
      const sallat = await agent.Sallat.list();

      sallat.forEach((salla) => {
        this.setSalla(salla);
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
  selectSalla = (id: string) => {
    this.selectedSalla = this.sallatRegistry.get(id);
  };
  cancelSelectedSalla = () => {
    this.selectedSalla = undefined;
  };
  openForm = (id?: string) => {
    id ? this.selectSalla(id) : this.cancelSelectedSalla();
    this.editMode = true;
  };
  closeForm = () => {
    this.editMode = false;
  };
  createSalla = async (salla: Salla) => {
    this.loading = true;
    salla.sallaId = uuid();
    try {
      await agent.Sallat.create(salla);
      runInAction(() => {
        this.sallatRegistry.set(salla.sallaId, salla);
        this.selectedSalla = salla;
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
  updateSalla = async (salla: Salla) => {
    this.loading = true;
    try {
      await agent.Sallat.update(salla);
      runInAction(() => {
        this.sallatRegistry.set(salla.sallaId, salla);
        this.selectedSalla = salla;
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
  deleteSalla = async (id: string) => {
    this.loading = true;
    try {
      await agent.Sallat.delete(id);
      runInAction(() => {
        this.sallatRegistry.delete(id);
        if (this.selectedSalla?.sallaId === id) this.cancelSelectedSalla();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  loadSalla = async (id: string) => {
    let salla = this.getSalla(id);
    if (salla) {
      this.selectedSalla = salla;
    } else {
      this.setLoadingInitial(true);
      try {
        salla = await agent.Sallat.details(id);
        this.setSalla(salla);
        this.setLoadingInitial(false);
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setSalla = (salla: Salla) => {
    this.sallatRegistry.set(salla.sallaId, salla);
  };

  private getSalla = (id: string) => {
    return this.sallatRegistry.get(id);
  };
  public getEmriSallesById = (id: string) => {
    return this.sallatRegistry.get(id)?.emriSalles;
  };
  
  public getSallaaById = (id: string) => {
    return this.sallatRegistry.get(id);
};
}
