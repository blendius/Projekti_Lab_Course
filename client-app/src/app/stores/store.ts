import { createContext, useContext } from "react";
import lendaStore from "./lendaStore";
import PostimiStore from "./postimetStore";

interface Store {
    postimiStore: PostimiStore
    lendaStore : lendaStore
}

export const store: Store = {
    postimiStore: new PostimiStore(),
    lendaStore: new lendaStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}