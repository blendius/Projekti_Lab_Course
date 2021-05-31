import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Termin } from "../models/termini";
import { v4 as uuid } from "uuid";

export default class TerminiStore {
  terminetRegistry = new Map<string, Termin>();
  selectedTermin: Termin | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get terminetByDate() {
    return Array.from(this.terminetRegistry.values()).sort(
      (a, b) => Date.parse(a.dataFillimit) - Date.parse(b.dataFillimit)
    );
  }

  loadTerminet = async () => {
    try {
      const terminet = await agent.Terminet.list();

      terminet.forEach((termin) => {
        this.setTermini(termin);
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
  selectTermini = (id: string) => {
    this.selectedTermin = this.terminetRegistry.get(id);
  };
  cancelSelectedTermini = () => {
    this.selectedTermin = undefined;
  };
  openForm = (id?: string) => {
    id ? this.selectTermini(id) : this.cancelSelectedTermini();
    this.editMode = true;
  };
  closeForm = () => {
    this.editMode = false;
  };
  createTermini = async (termini: Termin) => {
    this.loading = true;
    termini.id = uuid();
    try {
      await agent.Terminet.create(termini);
      runInAction(() => {
        this.terminetRegistry.set(termini.id, termini);
        this.selectedTermin = termini;
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
  updateTermini = async (termini: Termin) => {
    this.loading = true;
    try {
      await agent.Terminet.update(termini);
      runInAction(() => {
        this.terminetRegistry.set(termini.id, termini);
        this.selectedTermin = termini;
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
  deleteTermini = async (id: string) => {
    this.loading = true;
    try {
      await agent.Terminet.delete(id);
      runInAction(() => {
        this.terminetRegistry.delete(id);
        if (this.selectedTermin?.id === id) this.cancelSelectedTermini();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  loadTermini = async (id: string) => {
    let termini = this.getTermini(id);
    if (termini) {
      this.selectedTermin = termini;
    } else {
      this.setLoadingInitial(true);
      try {
        termini = await agent.Terminet.details(id);
        this.setTermini(termini);
        this.setLoadingInitial(false);
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setTermini = (termin: Termin) => {
    termin.dataFillimit = termin.dataFillimit.split("T")[0];
    termin.dataMbarimit = termin.dataMbarimit.split("T")[0];
    this.terminetRegistry.set(termin.id, termin);
  };

  private getTermini = (id: string) => {
    return this.terminetRegistry.get(id);
  };
}
