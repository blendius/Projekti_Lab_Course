//import react from 'react';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Container, Dropdown, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import AktivitetiStudenti from './AktivitetiStudenti';







export default observer(function AktivitetetDashboardStudenti() {
    const { aktivitetiStore } = useStore();
    const { selectedAktiviteti, editMode, openForm, getAktivitetet } = aktivitetiStore;





    useEffect(() => {
        aktivitetiStore.loadAktivitetet();

    }, [aktivitetiStore])

    if (aktivitetiStore.loadingInitial) return <LoadingComponent content='Lendet duke u Ngarkuar...' />

    return (

        <Grid>
            <h1 style={{ textAlign: "center", color: "#2B547E" }}> Aktivitetet </h1>
            <Grid.Column width='16' >


                <AktivitetiStudenti />

            </Grid.Column>

        </Grid>
    )
})