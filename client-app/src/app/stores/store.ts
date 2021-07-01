import { createContext, useContext } from "react";
import ProfesoriStore from "./profesoriStore";
import lendaStore from "./lendaStore";
import PostimiStore from "./postimetStore";
import NxenesiStore from "./nxenesiStore";
import ModalStore from "./modalStore";
import AdminStore from "./adminStore";
import CommonStore from "./commonStore";
import PrindiStore from "./prindiStore";
import PrindStoreAccount from "./prindStoreAccount";
import LaburatoriStore from "./laburatoriStore";
import KontaktiStore from "./kontaktiStore";
import OrariStore from "./orariStore";
import SallaStore from "./sallaStore";
import ParaleljaStore from "./paraleljaStore";
import KlasaStore from "./klasaStore";

interface Store {
  profesoriStore: ProfesoriStore;
  orariStore: OrariStore;
  postimiStore: PostimiStore;
  lendaStore: lendaStore;
  nxenesiStore: NxenesiStore;
  modalStore: ModalStore;
  adminStore: AdminStore;
  commonStore: CommonStore;
  prindiStore: PrindiStore;
  prindStoreAccount: PrindStoreAccount;
  laburatoriStore: LaburatoriStore;
  kontaktiStore: KontaktiStore;
  sallaStore: SallaStore;
  paraleljaStore: ParaleljaStore;
  klasaStore: KlasaStore;
}
export const store: Store = {
  profesoriStore: new ProfesoriStore(),
  orariStore: new OrariStore(),
  postimiStore: new PostimiStore(),
  lendaStore: new lendaStore(),
  nxenesiStore: new NxenesiStore(),
  modalStore: new ModalStore(),
  adminStore: new AdminStore(),
  commonStore: new CommonStore(),
  prindiStore: new PrindiStore(),
  prindStoreAccount: new PrindStoreAccount(),
  laburatoriStore: new LaburatoriStore(),
  kontaktiStore: new KontaktiStore(),
  sallaStore: new SallaStore(),
  paraleljaStore: new ParaleljaStore(),
  klasaStore: new KlasaStore()
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
