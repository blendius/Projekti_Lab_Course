import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { Pajisja } from "../models/pajisja";

export default class PajisjaStore {
  pajisjaRegistry = new Map<string, Pajisja>();
  selectedPajisja: Pajisja | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get pajisjetByDate() {
    return Array.from(this.pajisjaRegistry.values()).sort(
      (a, b) => Date.parse(a.dataEShtimit) - Date.parse(b.dataEShtimit)
    );
  }

  loadPajisjet = async () => {
    try {
      const pajisjet = await agent.Pajisjet.list();

      pajisjet.forEach((pajisja) => {
        pajisja.dataEShtimit = pajisja.dataEShtimit.split("T")[0];
        this.pajisjaRegistry.set(pajisja.pajisjaId, pajisja);
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
  selectPajisja = (id: string) => {
    this.selectedPajisja = this.pajisjaRegistry.get(id);
  };

  cancelselectedPajisja = () => {
    this.selectedPajisja = undefined;
  };
  openForm = (id?: string) => {
    id ? this.selectPajisja(id) : this.cancelselectedPajisja();
    this.editMode = true;
  };
  closeForm = () => {
    this.editMode = false;
  };

  createPajisja = async (pajisja: Pajisja, LabId: string) => {
    this.loading = true;
    pajisja.pajisjaId = uuid();
    try {
      await agent.Pajisjet.create(pajisja, LabId);
      runInAction(() => {
        this.pajisjaRegistry.set(pajisja.laburatioriId, pajisja);
        this.selectedPajisja = pajisja;
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

  updatePajisja = async (pajisja: Pajisja) => {
    this.loading = true;
    try {
      await agent.Pajisjet.update(pajisja);
      runInAction(() => {
        this.pajisjaRegistry.set(pajisja.laburatioriId, pajisja);
        this.selectedPajisja = pajisja;
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
  deletePajisja = async (id: string) => {
    this.loading = true;
    try {
      await agent.Pajisjet.delete(id);
      runInAction(() => {
        this.pajisjaRegistry.delete(id);
        if (this.selectedPajisja?.pajisjaId === id)
          this.cancelselectedPajisja();
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
