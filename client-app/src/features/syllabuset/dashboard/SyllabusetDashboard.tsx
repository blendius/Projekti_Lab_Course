//import react from 'react';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Container, Dropdown, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import SyllabusetDetails from '../details/SyllabusetDetails';
import SyllabusetForm from '../form/SyllabusetForm';
import SyllabusetList from './SyllabusetList';



export default observer(function SyllabusetDashboard() {
    const { syllabusiStore } = useStore();
    const { selectedSyllabusi, editMode, openForm, syllabusetByDate } = syllabusiStore;





    useEffect(() => {
        syllabusiStore.loadSyllabuset();

    }, [syllabusiStore])

    if (syllabusiStore.loadingInitial) return <LoadingComponent content='Syllabuset duke u Ngarkuar...' />

    return (
        <Grid>
            <Grid.Column width='12' >

                <SyllabusetList />

            </Grid.Column>
            <Grid.Column width='4'>
                <Container>
                    <Button onClick={() => openForm()} color='green' content='Krijo Syllabusin' size='big' ></Button>
                </Container>

                <h2 >Te Dhenat Per Syllabusin:</h2>

                {selectedSyllabusi && !editMode &&
                    <SyllabusetDetails />
                }
                {editMode &&
                    <SyllabusetForm />}

            </Grid.Column>
        </Grid>
    )
})