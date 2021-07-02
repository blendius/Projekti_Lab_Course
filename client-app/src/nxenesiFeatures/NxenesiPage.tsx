import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../app/stores/store";
import NavBarNxenesi from "./NavBarNxenesi";


export default observer(function NxenesiPage() {
    
    const { nxenesiStore,  commonStore } = useStore();
    useEffect(() => {
        if (commonStore.token) {
            nxenesiStore.getNxenesin().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, nxenesiStore])


    return(
        <NavBarNxenesi />
    )
})