import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ProfesoriDetais from '../details/ProfesoriDetails';
import ProfesoriForm from '../form/ProfesoriForm';
import ProfesoriList from './ProfesoriList';
import RegisterFormProf from '../form/RegisterFormProf';


export default observer(function ProfesoriDashboard() {
    const { profesoriStore, modalStore } = useStore();
    const { selectedProfessor, editMode } = profesoriStore
    
    return (
        <Grid>
            <Grid.Column width='6'>
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


            </Grid.Column>
        </Grid>
    )
})