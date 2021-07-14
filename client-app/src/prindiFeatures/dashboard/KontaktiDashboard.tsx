import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Grid, List } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ReplyList from '../../professorFeatures/Kontaktet/ReplyList';
import KontaktiDetails from '../details/KontaktiDetails';
import KontaktiForm from '../form/KontaktiForm';
import KontaktiList from './KontaktiList';
import KontaktiListReply from './KontaktiListReply';

export default observer(function KontaktiDashboard() {
    const { kontaktiStore, modalStore } = useStore();
    const { selectedKontakti, modalMode } = kontaktiStore
    return (
        <Grid>
            {/* <Grid.Column width='1'></Grid.Column> */}

            <Grid.Column width='6'>
                <hr></hr>
                <List.Header as='a'>Kontaktet e derguara nga ju: </List.Header>
                <hr></hr>
                <KontaktiList />
                <Button onClick={() => modalStore.openModal(<KontaktiForm />)} positive content="Dërgo një mesazh" />

            </Grid.Column>
            <Grid.Column width='4'></Grid.Column>

            <Grid.Column width='6'>
                <hr></hr>
                <List.Header as='a'>Kontaktet e pranuara: </List.Header>
                <hr></hr>
                <KontaktiListReply />
            </Grid.Column>
            <>
                {modalMode &&
                    modalStore.openModal(<KontaktiDetails />)}

            </>
        </Grid>
    )
})