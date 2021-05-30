import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ProfesoriDetais from '../details/ProfesoriDetails';
import ProfesoriForm from '../form/ProfesoriForm';
import ProfesoriList from './ProfesoriList';



export default observer( function ProfesoriDashboard() {
    const { profesoriStore } = useStore();
    const { selectedProfessor, editMode } = profesoriStore
    return (
        <Grid>
            <Grid.Column width='6'>
                <ProfesoriList />
                <Button onClick={() => profesoriStore.openForm()} positive content="Shto Profesorin" />


            </Grid.Column>
            <Grid.Column width='2'></Grid.Column>
            <Grid.Column width='8'>
                {selectedProfessor && !editMode &&
                    <ProfesoriDetais />}
                {editMode &&
                    <ProfesoriForm />}
                

            </Grid.Column>
        </Grid>
    )
})