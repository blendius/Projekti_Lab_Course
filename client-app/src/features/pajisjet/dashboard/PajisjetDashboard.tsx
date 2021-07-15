import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import PajisjetDetails from '../details/PajisjetDetails';
import PajisjaForm from '../form/PajisjaForm';
import PajisjetList from './PajisjetList';




export default observer(function PajisjetDashboard() {
    const { pajisjetStore } = useStore();
    const { selectedPajisja, editMode } = pajisjetStore

    useEffect(() => {
        pajisjetStore.loadPajisjet();
    }, [pajisjetStore])
    return (
        <Grid>
            <Grid.Column width='10'>
                <PajisjetList />
                <Button onClick={() => pajisjetStore.openForm()} positive content="Shto Pajisjen" />


            </Grid.Column>
            <Grid.Column width='6'>
                {selectedPajisja && !editMode &&
                    <PajisjetDetails />}
                {editMode &&
                    <PajisjaForm />}


            </Grid.Column>
        </Grid>
    )
})