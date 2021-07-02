import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "../app/stores/store";

export default observer(function AdminPage() {
    const { commonStore, adminStore,  } = useStore();
    useEffect(() => {
        if (commonStore.token) {
            adminStore.getUser().finally(() => commonStore.setAppLoaded())
        } 
    }, [commonStore, adminStore])
    return <></>
})