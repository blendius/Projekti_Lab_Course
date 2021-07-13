import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Card, Image, List } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';


export default observer(function FeedbackDetails() {
    const { feedbackStore } = useStore();
    const { deleteFeedback, loading } = feedbackStore

    const { selectedFeedback: feedback, openForm, cancelSelectedFeedback } = feedbackStore;

    const [target, setTarget] = useState('');

    function handleFeedbackDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteFeedback(id)
    }

    if (!feedback) return <LoadingComponent />

    return (
        <List>
            <div className='details'>
                <Card.Content>
                    <Card.Description className='teDhena'>
                        <Card.Header >{feedback.subject}</Card.Header>
                        <div className="data"><label >Mesaxhi:  </label>  {feedback.message}</div>
                        <div className="data"><label >Email i profesorit:  </label>  {feedback.nxenesiEmail}</div>
                        <div className="data"><label >Data e dergimit:</label> {feedback.messageSentDate}</div>
                    </Card.Description>
                </Card.Content>
            </div>
            <Card.Content extra>

                <Button name={feedback.feedbackID}
                    loading={loading && target === feedback.feedbackID}
                    onClick={(e) => handleFeedbackDelete(e, feedback.feedbackID)}
                    content='Fshije' className='detailsbtn' color='red' />
                <Button onClick={cancelSelectedFeedback} color='grey' content='cancel' className='detailsbtn' />

            </Card.Content>
        </List>
    )
})