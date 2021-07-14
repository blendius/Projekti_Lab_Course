import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { Klasa } from "../models/klasa";
import ParaleljaStore from "./paraleljaStore";

export default class KlasaStore {
  klasatRegistry = new Map<string, Klasa>();
  selectedKlasa: Klasa | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }
  get klasatByVit() {
    return Array.from(this.klasatRegistry.values()).sort(
      (s1, s2) => s1.viti - s2.viti
    );
  }

  get getKlasat() {
    return Array.from(this.klasatRegistry.values());
  }

  loadKlasat = async () => {
    try {
      const klasat = await agent.Klasat.list();

      klasat.forEach((klasa) => {
        this.setKlasa(klasa);
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
  selectKlasa = (id: string) => {
    this.selectedKlasa = this.klasatRegistry.get(id);
  };
  cancelSelectedKlasa = () => {
    this.selectedKlasa = undefined;
  };
  openForm = (id?: string) => {
    id ? this.selectKlasa(id) : this.cancelSelectedKlasa();
    this.editMode = true;
  };
  closeForm = () => {
    this.editMode = false;
  };
  createKlasa = async (klasa: Klasa, paraleljaId: string, sallaId: string) => {
    this.loading = true;
    klasa.klasaId = uuid();
    try {
      await agent.Klasat.create(klasa, paraleljaId, sallaId);
      runInAction(() => {
        this.klasatRegistry.set(klasa.klasaId, klasa);
        this.selectedKlasa = klasa;
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
  updateKlasa = async (klasa: Klasa, paraleljaId: string, sallaId: string) => {
    this.loading = true;
    try {
      await agent.Klasat.update(klasa, paraleljaId, sallaId);
      runInAction(() => {
        this.klasatRegistry.set(klasa.klasaId, klasa);
        this.selectedKlasa = klasa;
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
  deleteKlasa = async (id: string) => {
    this.loading = true;
    try {
      await agent.Klasat.delete(id);
      runInAction(() => {
        this.klasatRegistry.delete(id);
        if (this.selectedKlasa?.klasaId === id) this.cancelSelectedKlasa();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  loadKlasa = async (id: string) => {
    let klasa = this.getKlasa(id);
    if (klasa) {
      this.selectedKlasa = klasa;
    } else {
      this.setLoadingInitial(true);
      try {
        klasa = await agent.Klasat.details(id);
        this.setKlasa(klasa);
        this.setLoadingInitial(false);
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setKlasa = (klasa: Klasa) => {
    this.klasatRegistry.set(klasa.klasaId, klasa);
  };

    public getKlasa = (id: string) => {
        return this.klasatRegistry.get(id);
    };
    // public getEmriKlases = (id: string) => {
    //     return this.klasatRegistry.get(id)?.viti + "/" + this.klasatRegistry.get(id)?.paraleljaId
    // }

};

