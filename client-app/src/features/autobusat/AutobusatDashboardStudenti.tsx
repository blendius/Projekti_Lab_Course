//import react from 'react';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Container, Dropdown, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import AutobusatListStudenti from './AutobusatListStudenti';



export default observer(function AutobusatDashboardStudenti() {
    const { autobusiStore } = useStore();
    const { selectedAutobusi, editMode, openForm, getAutobusat } = autobusiStore;





    useEffect(() => {
        autobusiStore.loadAutobusat();

    }, [autobusiStore])

    if (autobusiStore.loadingInitial) return <LoadingComponent content='Autobusat duke u Ngarkuar...' />

    return (
        <Grid>
            <h1 style={{ textAlign: "center", color: "#2B547E" }}> Autobusat e shkolles </h1>
            <Grid.Column width='16' >
                <AutobusatListStudenti />
            </Grid.Column>
        </Grid>
    )
})