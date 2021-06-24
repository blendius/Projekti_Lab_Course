import { createContext, useContext } from "react";
import ProfesoriStore from "./profesoriStore";
import TerminiStore from "./terminiStore";
import lendaStore from "./lendaStore";
import PostimiStore from "./postimetStore";
import ModalStore from "./modalStore";
import AdminStore from "./adminStore";
import CommonStore from "./commonStore";
import PrindiStore from "./prindiStore";

interface Store {
  profesoriStore: ProfesoriStore;
  terminiStore: TerminiStore;
  postimiStore: PostimiStore;
  lendaStore: lendaStore;
  modalStore: ModalStore;
  adminStore: AdminStore;
  commonStore: CommonStore;
  prindiStore: PrindiStore;
}
export const store: Store = {
  profesoriStore: new ProfesoriStore(),
  terminiStore: new TerminiStore(),
  postimiStore: new PostimiStore(),
  lendaStore: new lendaStore(),
  modalStore: new ModalStore(),
  adminStore: new AdminStore(),
  commonStore: new CommonStore(),
  prindiStore: new PrindiStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}