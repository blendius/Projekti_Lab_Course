import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../app/stores/store";
import NavBarPrindi from "./NavBarPrindi";

export default observer(function PrindiPage() {
    
    const { prindStoreAccount,  commonStore } = useStore();
    useEffect(() => {
        if (commonStore.token) {
            prindStoreAccount.getPrindi().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, prindStoreAccount])


    return <NavBarPrindi />
})