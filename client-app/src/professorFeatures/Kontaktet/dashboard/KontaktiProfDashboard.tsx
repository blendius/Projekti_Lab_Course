import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Grid, List } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import KontaktiDetails from '../../../prindiFeatures/details/KontaktiDetails';
import KontaktiForm from '../../../prindiFeatures/form/KontaktiForm';
import KontaktetProfDetails from '../KontaktetProfDetails';
import KontaktiProfList from '../KontaktiProfList';
import ReplyForm from '../ReplyForm';
import ReplyList from '../ReplyList';

export default observer(function KontaktiDashboard() {
    const { kontaktiStore } = useStore();
    const { selectedKontakti, editMode } = kontaktiStore
    return (
        <Grid>

            <Grid.Column width='5'>
                <hr></hr>
                <List.Header as='a'>Kontaktet e pranuara: </List.Header>
                <hr></hr>
                <KontaktiProfList />
            </Grid.Column>

            <Grid.Column width='1'></Grid.Column>

            <Grid.Column width='5'>
                <hr></hr>
                <List.Header as='a'>Kontaktet e derguara nga ju: </List.Header>
                <hr></hr>
                <ReplyList />
            </Grid.Column>
            <Grid.Column width='1'></Grid.Column>

            <Grid.Column width='4'>
                {selectedKontakti &&
                    <KontaktetProfDetails />}
                {editMode &&
                    <ReplyForm />}
            </Grid.Column>
        </Grid>
    )
})