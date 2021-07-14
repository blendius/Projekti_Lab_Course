import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { Autobusi } from "../models/Autobusi";

export default class AutobusiStore {
  autobusatRegistry = new Map<string, Autobusi>();
  selectedAutobusi: Autobusi | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get getAutobusat() {
    return Array.from(this.autobusatRegistry.values());
  }

  loadAutobusat = async () => {
    try {
      const autobusat = await agent.Autobusat.list();

      autobusat.forEach((autobusi) => {
        this.setAutobusi(autobusi);
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
  selectAutobusi = (id: string) => {
    this.selectedAutobusi = this.autobusatRegistry.get(id);
  };
  cancelSelectedAutobusi = () => {
    this.selectedAutobusi = undefined;
  };
  openForm = (id?: string) => {
    id ? this.selectAutobusi(id) : this.cancelSelectedAutobusi();
    this.editMode = true;
  };
  closeForm = () => {
    this.editMode = false;
  };
  createAutobusi = async (autobusi: Autobusi) => {
    this.loading = true;
    autobusi.autobusiId = uuid();
    try {
      await agent.Autobusat.create(autobusi);
      runInAction(() => {
        this.autobusatRegistry.set(autobusi.autobusiId, autobusi);
        this.selectedAutobusi = autobusi;
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
  updateAutobusi = async (autobusi: Autobusi) => {
    this.loading = true;
    try {
      await agent.Autobusat.update(autobusi);
      runInAction(() => {
        this.autobusatRegistry.set(autobusi.autobusiId, autobusi);
        this.selectedAutobusi = autobusi;
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
  deleteAutobusi = async (id: string) => {
    this.loading = true;
    try {
      await agent.Autobusat.delete(id);
      runInAction(() => {
        this.autobusatRegistry.delete(id);
        if (this.selectedAutobusi?.autobusiId === id)
          this.cancelSelectedAutobusi();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  loadAutobusi = async (id: string) => {
    let autobusi = this.getAutobusi(id);
    if (autobusi) {
      this.selectedAutobusi = autobusi;
    } else {
      this.setLoadingInitial(true);
      try {
        autobusi = await agent.Autobusat.details(id);
        this.setAutobusi(autobusi);
        this.setLoadingInitial(false);
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setAutobusi = (autobusi: Autobusi) => {
    this.autobusatRegistry.set(autobusi.autobusiId, autobusi);
  };

  private getAutobusi = (id: string) => {
    return this.autobusatRegistry.get(id);
  };
}
