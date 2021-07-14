import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ProfesoriDetais from '../details/ProfesoriDetails';
import ProfesoriForm from '../form/ProfesoriForm';
import ProfesoriList from './ProfesoriList';
import RegisterFormProf from '../form/RegisterFormProf';
import ProfKlasa from './ProfKlasa';
import "../prof-style.css";


export default observer(function ProfesoriDashboard() {
    const { profesoriStore, modalStore } = useStore();
    const { selectedProfessor, editMode, klasaMode } = profesoriStore

    useEffect(() => {
        profesoriStore.loadProfesoriKlaset(selectedProfessor?.id);
    }, [profesoriStore])

    return (
        <Grid>
            <Grid.Column width='12'>
                <ProfesoriList />


            </Grid.Column>

            <Grid.Column width='4'>
                <Button onClick={() => modalStore.openModal(<RegisterFormProf />)} size='small' >
                    regjistro nje profesor!
                </Button>
                {selectedProfessor && !editMode &&
                    <ProfesoriDetais />}
                {editMode &&
                    <ProfesoriForm />}

                {klasaMode &&
                    modalStore.openModal(<ProfKlasa />)
                }


            </Grid.Column>
        </Grid>
    )
})