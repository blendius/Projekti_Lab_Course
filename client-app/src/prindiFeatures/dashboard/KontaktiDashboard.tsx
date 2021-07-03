import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import KontaktiDetails from '../details/KontaktiDetails';
import KontaktiForm from '../form/KontaktiForm';
import KontaktiList from './KontaktiList';




export default observer( function KontaktiDashboard() {
    const { kontaktiStore } = useStore();
    const { selectedKontakti, editMode } = kontaktiStore
    return (
        <Grid>
                        <Grid.Column width='1'></Grid.Column>

            <Grid.Column width='7'>
                <KontaktiList />
                <Button onClick={() => kontaktiStore.openForm()} positive content="Dergo nje Mesazhe" />


            </Grid.Column>
            <Grid.Column width='2'></Grid.Column>
            <Grid.Column width='6'>
                {selectedKontakti && !editMode &&
                    <KontaktiDetails />}
                {editMode &&
                    <KontaktiForm />}
                

            </Grid.Column>
        </Grid>
    )
})