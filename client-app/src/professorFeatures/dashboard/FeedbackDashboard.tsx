import { observer } from "mobx-react-lite";
import { Button, Grid } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import FeedbackDetails from "../details/FeedbackDetails";
import FeedbackForm from "../form/FeedbackForm";
import FeedbackList from "./FeedbackList";

export default observer(function FeedbackDashboard() {
    const { feedbackStore } = useStore();
    const { selectedFeedback, editMode } = feedbackStore

    
    return (
        <Grid>
            <Grid.Column width='6'>
                <FeedbackList />
                <Button onClick={() => feedbackStore.openForm()} positive content="Dergo nje Mesazhe" />


            </Grid.Column>
            <Grid.Column width='2'></Grid.Column>
            <Grid.Column width='8'>
                {selectedFeedback && !editMode &&
                    <FeedbackDetails />}
                {editMode &&
                    <FeedbackForm />}


            </Grid.Column>
        </Grid>
    )
})