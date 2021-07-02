import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import PajisjetDetails from '../details/PajisjetDetails';
import PajisjaForm from '../form/PajisjaForm';
import PajisjetList from './PajisjetList';




export default observer(function PajisjetDashboard() {
    const { pajisjetStore } = useStore();
    const { selectedPajisja, editMode } = pajisjetStore
    return (
        <Grid>
            <Grid.Column width='6'>
                <PajisjetList />
                <Button onClick={() => pajisjetStore.openForm()} positive content="Shto Laburatorin" />


            </Grid.Column>
            <Grid.Column width='2'></Grid.Column>
            <Grid.Column width='8'>
                {selectedPajisja && !editMode &&
                    <PajisjetDetails />}
                {editMode &&
                    <PajisjaForm />}


            </Grid.Column>
        </Grid>
    )
})