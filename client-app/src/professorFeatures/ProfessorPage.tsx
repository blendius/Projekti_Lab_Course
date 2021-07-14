import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../app/stores/store";

export default observer(function ProfessorPage() {
    // return <NavBarProf />
    const { profesoriStore,  commonStore } = useStore();

    useEffect(() => {
        if (commonStore.token) {
            profesoriStore.getProf().finally(() => commonStore.setAppLoaded())
        } else {
            commonStore.setAppLoaded();
        }

    }, [commonStore, profesoriStore])

    

    return <h6>  </h6>
})