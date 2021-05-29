import { createContext, useContext } from "react";
import ProfesoriStore from "./profesoriStore";

interface Store{
    profesoriStore: ProfesoriStore;
}
export const store:Store={
    profesoriStore: new ProfesoriStore()
}

export const StoreContext =createContext(store);

export function useStore(){
    return useContext(StoreContext);
}