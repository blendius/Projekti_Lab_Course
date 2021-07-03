//import react from 'react';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Container, Dropdown, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import AktivitetetDetails from '../details/AktivitetetDetails';
import AktivitetiForm from '../form/AktivitetiForm';
import AktivitetetList from './AktivitetetList';





export default observer(function AktivitetetDashboard() {
    const { aktivitetiStore } = useStore();
    const { selectedAktiviteti, editMode, openForm, getAktivitetet } = aktivitetiStore;





    useEffect(() => {
        aktivitetiStore.loadAktivitetet();

    }, [aktivitetiStore])

    if (aktivitetiStore.loadingInitial) return <LoadingComponent content='Lendet duke u Ngarkuar...' />

    return (
        <Grid>
            <Grid.Column width='12' >


                <AktivitetetList />

            </Grid.Column>
            <Grid.Column width='4'>
                <Container>
                    <Button onClick={() => openForm()} color='green' content='Krijo Lende' size='big' ></Button>
                </Container>

                <h2 >Te Dhenat Per Aktivitetin:</h2>

                {selectedAktiviteti && !editMode &&
                    <AktivitetetDetails />}
                {editMode &&
                    <AktivitetiForm />}


            </Grid.Column>
        </Grid>
    )
})