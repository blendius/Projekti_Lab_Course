import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ProfesoriDetais from '../details/ProfesoriDetails';
import ProfesoriForm from '../form/ProfesoriForm';
import RegisterFormProf from '../form/RegisterFormProf';
import ProfesoriList from './ProfesoriList';



export default observer(function ProfesoriDashboard() {
    const { profesoriStore, modalStore ,commonStore} = useStore();
    const { selectedProfessor, editMode } = profesoriStore
    useEffect(() => {
        if (commonStore.token) {
            profesoriStore.getProf().finally(() => commonStore.setAppLoaded())
        } else {
            commonStore.setAppLoaded();
        }

    }, [commonStore, profesoriStore])
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