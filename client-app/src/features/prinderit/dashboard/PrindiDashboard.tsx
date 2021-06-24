import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import PrindiForm from '../form/PrindiForm';
import PrindiList from './PrindiList';

export default observer(function PrindiDashboard() {

    const {prindiStore} = useStore();
    const {selectedPrindi, editMode, closeForm, openForm} = prindiStore;

    return (
        <Grid>
            <Grid.Column width='12'>
                <PrindiList/>
            </Grid.Column>

            <Grid.Column width='4'>
                <Button onClick={() => prindiStore.openForm()} positive content="Shto Prindin" size='big'/>
                {editMode &&
                    <PrindiForm />}
            </Grid.Column>
        </Grid>
    )
})