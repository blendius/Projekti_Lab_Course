//import react from 'react';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Container, Dropdown, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import LendetDetails from '../details/LendetDetails';
import LendetForm from '../form/LendaForm';
import LendetFilter from './LendetFilter';
import LendetList from './LendetList';



export default observer(function LendetDashboard() {
    const { lendaStore,syllabusiStore } = useStore();
    const { selectedLenda, editMode, openForm, lendetByDate } = lendaStore;


   


    useEffect(() => {
        lendaStore.loadLendet();
        syllabusiStore.loadSyllabuset();

    }, [lendaStore])

    if (lendaStore.loadingInitial) return <LoadingComponent content='Lendet duke u Ngarkuar...' />

    return (
        <Grid>
            <Grid.Column width='12' >
                {/* as={Link} to="/krijoLende" */}

                <LendetList />

            </Grid.Column>
            <Grid.Column width='4'>
                <Container>
                    <Button onClick={() => openForm()} color='green' content='Krijo Lende' size='big' ></Button>
                </Container>

                <h2 >Te Dhenat Per Lenden:</h2>

                {selectedLenda && !editMode &&
                    <LendetDetails
                    />}
                {editMode &&
                    <LendetForm />}
                <LendetFilter />

            </Grid.Column>
        </Grid>
    )
})