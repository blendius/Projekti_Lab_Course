//import react from 'react';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Container, Dropdown, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import AutobusiDetails from '../details/AutobusiDetails';
import AutobusiForm from '../form/AutobusiForm';
import AutobusatList from './AutobusatList';


export default observer(function AutobusatDashboard() {
    const { autobusiStore } = useStore();
    const { selectedAutobusi, editMode, openForm, getAutobusat } = autobusiStore;





    useEffect(() => {
        autobusiStore.loadAutobusat();

    }, [autobusiStore])

    if (autobusiStore.loadingInitial) return <LoadingComponent content='Autobusat duke u Ngarkuar...' />

    return (
        <Grid>
            <Grid.Column width='12' >


                <AutobusatList />

            </Grid.Column>
            <Grid.Column width='4'>
                <Container>
                    <Button onClick={() => openForm()} color='green' content='Krijo Autobus' size='big' ></Button>
                </Container>

                <h2 >Te Dhenat Per Autobusin:</h2>

                {selectedAutobusi && !editMode &&
                    <AutobusiDetails />}
                {editMode &&
                    <AutobusiForm />}


            </Grid.Column>
        </Grid>
    )
})