import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Laburatori } from "../models/laburatori";
import { v4 as uuid } from "uuid";

export default class LaburatoriStore {
  laburatoriRegistry = new Map<string, Laburatori>();
  selectedLaburatori: Laburatori | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get laburatoriByDate() {
    return Array.from(this.laburatoriRegistry.values()).sort(
      (a, b) => Date.parse(a.dataEKrijimit) - Date.parse(b.dataEKrijimit)
    );
  }

  loadLaburatoret = async () => {
    try {
      const laburatoret = await agent.Laburatoret.list();

      laburatoret.forEach((laburatori) => {
        laburatori.dataEKrijimit = laburatori.dataEKrijimit.split("T")[0];
        this.laburatoriRegistry.set(laburatori.id, laburatori);
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
  selectLaburatori = (id: string) => {
    this.selectedLaburatori = this.laburatoriRegistry.get(id);
  };

  cancelSelectedLaburatori = () => {
    this.selectedLaburatori = undefined;
  };
  openForm = (id?: string) => {
    id ? this.selectLaburatori(id) : this.cancelSelectedLaburatori();
    this.editMode = true;
  };
  closeForm = () => {
    this.editMode = false;
  };

  createLaburatori = async (laburatori: Laburatori, LendaId: string) => {
    this.loading = true;
    laburatori.id = uuid();
    try {
      await agent.Laburatoret.create(laburatori, LendaId);
      runInAction(() => {
        this.laburatoriRegistry.set(laburatori.id, laburatori);
        this.selectedLaburatori = laburatori;
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

  updateLaburatori = async (laburatori: Laburatori) => {
    this.loading = true;
    try {
      await agent.Laburatoret.update(laburatori);
      runInAction(() => {
        this.laburatoriRegistry.set(laburatori.id, laburatori);
        this.selectedLaburatori = laburatori;
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
  deleteLaburatori = async (id: string) => {
    this.loading = true;
    try {
      await agent.Laburatoret.delete(id);
      runInAction(() => {
        this.laburatoriRegistry.delete(id);
        if (this.selectedLaburatori?.id === id) this.cancelSelectedLaburatori();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
