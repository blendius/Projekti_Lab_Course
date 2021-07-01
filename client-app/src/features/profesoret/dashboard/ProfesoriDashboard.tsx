import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ProfesoriDetais from '../details/ProfesoriDetails';
import ProfesoriForm from '../form/ProfesoriForm';
import ProfesoriList from './ProfesoriList';
import RegisterFormProf from '../form/RegisterFormProf';
import LoadingComponent from '../../../app/layout/LoadingComponent';


export default observer(function ProfesoriDashboard() {
    const { profesoriStore, modalStore } = useStore();
    const { selectedProfessor, editMode } = profesoriStore
    
    useEffect(() => {
        profesoriStore.loadProfesoret();

    }, [profesoriStore])

    if (profesoriStore.loadingInitial) return <LoadingComponent content='Lendet duke u Ngarkuar...' />

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


            </Grid.Column>
        </Grid>
    )
})