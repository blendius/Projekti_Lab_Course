import { createContext, useContext } from "react";
import PostimiStore from "./postimetStore";

interface Store {
    postimiStore: PostimiStore
}

export const store: Store = {
    postimiStore: new PostimiStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}