import { createContext, useContext } from "react";
import ProfesoriStore from "./profesoriStore";
import TerminiStore from "./terminiStore";
import lendaStore from "./lendaStore";
import PostimiStore from "./postimetStore";

interface Store {
  profesoriStore: ProfesoriStore;
  terminiStore: TerminiStore;
  postimiStore: PostimiStore;
  lendaStore: lendaStore;
}
export const store: Store = {
  profesoriStore: new ProfesoriStore(),
  terminiStore: new TerminiStore(),
  postimiStore: new PostimiStore(),
  lendaStore: new lendaStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
