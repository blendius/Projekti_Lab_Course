import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { useStore } from "../app/stores/store";
import NavBarProf from "./NavBarProf";

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

    return(
        <NavBarProf />
    )
})