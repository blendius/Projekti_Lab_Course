import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Prindi } from "../models/prindi";
import { v4 as uuid } from "uuid";
import { Parent } from "../models/parent";

export default class PrindiStore {
  prindiRegistry = new Map<string, Prindi>();
  selectedPrindi: Prindi | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get prinderitByName() {
    // return Array.from(this.prindiRegistry.values()).sort(function (p1, p2) { if (p1.emri < p2.emri) { return -1; } if (p1.emri > p2.emri) { return 1 } return 0; });
    return Array.from(this.prindiRegistry.values()).sort((p1, p2) =>
      p1.displayName.localeCompare(p2.displayName)
    );
  }

  loadPrinderit = async () => {
    try {
      const prinderit = await agent.Prinderit.list();
      prinderit.forEach((prindi) => {
        this.prindiRegistry.set(prindi.id, prindi);
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

  selectPrindi = (id: string) => {
    this.selectedPrindi = this.prindiRegistry.get(id);
  };

  cancelSelectedPrindi = () => {
    this.selectedPrindi = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectPrindi(id) : this.cancelSelectedPrindi();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createPrindi = async (prindi: Prindi) => {
    this.loading = true;
    prindi.id = uuid();
    try {
      await agent.Prinderit.create(prindi);
      runInAction(() => {
        this.prindiRegistry.set(prindi.id, prindi);
        this.selectedPrindi = prindi;
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

  updatePrindi = async (prindi: Prindi ) => {
    this.loading = true;
    try {
      await agent.Prinderit.update(prindi);
      runInAction(() => {
        this.prindiRegistry.set(prindi.id, prindi);
        this.selectedPrindi = prindi;
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

  deletePrindi = async (id: string) => {
    this.loading = true;
    try {
      await agent.Prinderit.delete(id);
      runInAction(() => {
        this.prindiRegistry.delete(id);
        if (this.selectedPrindi?.id === id) this.cancelSelectedPrindi();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }    
  };
  public getEmriPrinditById = (id: string) => {
    return this.prindiRegistry.get(id)?.displayName;
  }
}
