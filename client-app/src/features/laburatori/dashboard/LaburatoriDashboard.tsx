import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LaburatoriDetails from '../details/LaburatoriDetails';
import LaburatoriForm from '../form/LaburatoriForm';
import LaburatoriList from './LaburatoriList';



export default observer( function LaburatoriDashboard() {
    const { laburatoriStore } = useStore();
    const { selectedLaburatori, editMode } = laburatoriStore
    return (
        <Grid>
            <Grid.Column width='6'>
                <LaburatoriList />
                <Button onClick={() => laburatoriStore.openForm()} positive content="Shto Laburatorin" />


            </Grid.Column>
            <Grid.Column width='2'></Grid.Column>
            <Grid.Column width='8'>
                {selectedLaburatori && !editMode &&
                    <LaburatoriDetails />}
                {editMode &&
                    <LaburatoriForm />}
                

            </Grid.Column>
        </Grid>
    )
})