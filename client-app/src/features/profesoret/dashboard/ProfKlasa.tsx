import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AddKlasaForm from '../form/AddKlasaForm';
import ProfKlasaList from './ProfKlasaList';


export default observer(function ProfesoriDashboard() {
    const { profesoriStore } = useStore();
    const { selectedProfessor, closeAddKlasaForm } = profesoriStore

    useEffect(() => {
        profesoriStore.loadProfesoriKlaset(selectedProfessor?.id);
    }, [profesoriStore])

    return (
        <Grid>
            <Grid.Column width='5'>
                <AddKlasaForm />
            </Grid.Column>
            <Grid.Column width='2'></Grid.Column>
            <Grid.Column width='9'>
                <ProfKlasaList />
                <Button onClick={closeAddKlasaForm} size='small' floated='right' type='button' content='Cancel' />
            </Grid.Column>

        </Grid>
    )
})