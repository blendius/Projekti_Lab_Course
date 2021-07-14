import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Grid, List } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import FeedbackDetails from './details/FeedbackDetails';
import FeedbackList from './FeedbackList';
import FeedbackForm from './form/FeedbackForm';
import FeedbackListReplay from './replay/FeedbackListReplay';

export default observer(function FeedbackDashboard() {
    const { feedbackStore, modalStore } = useStore();
    const { selectedFeedback, modalMode } = feedbackStore
    return (
        <Grid>
            {/* <Grid.Column width='1'></Grid.Column> */}

            <Grid.Column width='6'>
                <hr></hr>
                <List.Header as='a'>Feedbacks sent by you: </List.Header>
                <hr></hr>
                <FeedbackList />
                <Button onClick={() => modalStore.openModal(<FeedbackForm />)} positive content="Dërgo një mesazh" />

            </Grid.Column>
            <Grid.Column width='4'></Grid.Column>

            <Grid.Column width='6'>
                <hr></hr>
                <List.Header as='a'>Kontaktet e pranuara: </List.Header>
                <hr></hr>
                <FeedbackListReplay />
            </Grid.Column>
            <>
                {modalMode &&
                    modalStore.openModal(<FeedbackDetails />)}

            </>
        </Grid>
    )
})