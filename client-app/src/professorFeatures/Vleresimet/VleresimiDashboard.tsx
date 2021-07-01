import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import VlersimiStore from '../../app/stores/vlersimiStore';
import VleresimiDetails from './VleresimiDetails';
import VlersimiForm from './VlersimiForm';
import VlersimiList from './VlersimiList';




export default observer( function VleresimiDashboard() {
    const { vleresimiStore } = useStore();
    const { selectedVlersimi, editMode } = vleresimiStore
    return (
        <Grid>
            <Grid.Column width='6'>
                <VlersimiList />
                <Button onClick={() => vleresimiStore.openForm()} positive content="Shto Vlersimin" />


            </Grid.Column>
            <Grid.Column width='2'></Grid.Column>
            <Grid.Column width='8'>
                {selectedVlersimi && !editMode &&
                    <VleresimiDetails />}
                {editMode &&
                    <VlersimiForm />}
                

            </Grid.Column>
        </Grid>
    )
})