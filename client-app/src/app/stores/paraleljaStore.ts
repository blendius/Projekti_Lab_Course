import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { Paralelja } from "../models/paralelja";

export default class ParaleljaStore {
  paraleletRegistry = new Map<string, Paralelja>();
  selectedParalelja: Paralelja | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }
  get paraleletByNumri() {
    return Array.from(this.paraleletRegistry.values()).sort(
      (s1, s2) => s1.numri - s2.numri
    );
  }

  get getParalelet() {
    return Array.from(this.paraleletRegistry.values());
  }

  loadParalelet = async () => {
    try {
      const paralelet = await agent.Paralelet.list();

      paralelet.forEach((paralelja) => {
        this.setParalelja(paralelja);
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
  selectParalelja = (id: string) => {
    this.selectedParalelja = this.paraleletRegistry.get(id);
  };
  cancelSelectedParalelja = () => {
    this.selectedParalelja = undefined;
  };
  openForm = (id?: string) => {
    id ? this.selectParalelja(id) : this.cancelSelectedParalelja();
    this.editMode = true;
  };
  closeForm = () => {
    this.editMode = false;
  };
  createParalelja = async (paralelja: Paralelja) => {
    this.loading = true;
    paralelja.paraleljaId = uuid();
    try {
      await agent.Paralelet.create(paralelja);
      runInAction(() => {
        this.paraleletRegistry.set(paralelja.paraleljaId, paralelja);
        this.selectedParalelja = paralelja;
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
  updateParalelja = async (paralelja: Paralelja) => {
    this.loading = true;
    try {
      await agent.Paralelet.update(paralelja);
      runInAction(() => {
        this.paraleletRegistry.set(paralelja.paraleljaId, paralelja);
        this.selectedParalelja = paralelja;
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
  deleteParalelja = async (id: string) => {
    this.loading = true;
    try {
      await agent.Paralelet.delete(id);
      runInAction(() => {
        this.paraleletRegistry.delete(id);
        if (this.selectedParalelja?.paraleljaId === id)
          this.cancelSelectedParalelja();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  loadParalelja = async (id: string) => {
    let paralelja = this.getParalelja(id);
    if (paralelja) {
      this.selectedParalelja = paralelja;
    } else {
      this.setLoadingInitial(true);
      try {
        paralelja = await agent.Paralelet.details(id);
        this.setParalelja(paralelja);
        this.setLoadingInitial(false);
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setParalelja = (paralelja: Paralelja) => {
    this.paraleletRegistry.set(paralelja.paraleljaId, paralelja);
  };

    private getParalelja = (id: string) => {
        return this.paraleletRegistry.get(id);
    };
    public getNumriParalelesById = (id: string) => {
        return this.paraleletRegistry.get(id)?.numri;
    };

    public getParaleljaById = (id: string) => {
        return this.paraleletRegistry.get(id);
    };

    public getParaleljaNumribyId = (id: string) => {
      let paralejla = this.paraleletRegistry.get(id)?.numri;
      return paralejla;
    };
}
