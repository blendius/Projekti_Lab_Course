import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "../app/stores/store";
import Paneli from "./paneli/Paneli";
import NavBar from "./NavBar";

export default observer(function AdminPage() {
    const { commonStore, adminStore,  } = useStore();
    useEffect(() => {
        if (commonStore.token) {
            adminStore.getUser().finally(() => commonStore.setAppLoaded())
        } 
    }, [commonStore, adminStore])
    return <></>
})