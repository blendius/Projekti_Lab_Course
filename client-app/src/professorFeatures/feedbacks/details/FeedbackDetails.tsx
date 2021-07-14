import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { Button, Card, Confirm, Label } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function FeedbackDetails() {
    const { feedbackStore, profesoriStore } = useStore();
    const { deleteFeedback } = feedbackStore

    const { selectedFeedback: feedback, loading, cancelSelectedFeedback } = feedbackStore;

    const [target, setTarget] = useState('');
    const [openConfirm, setOpenConfirm] = useState(false)

    function handleKontaktiDelete(id: string) {
        deleteFeedback(id)
    }


    if (!feedback) return <LoadingComponent />

    return (
        <Card>
            <Label color='grey'>
                Subjekti
            </Label>
            <Card.Content header={feedback.subject} />
            <Label as='a' color='grey'>
                Mesazhi
            </Label>
            <Card.Content description={feedback.message} />
            <Card.Content extra textAlign='center'>

                {profesoriStore.getEmriProfById(feedback.profesoriId)}  ,
                {feedback.messageSentDate}
            </Card.Content>
            <Card.Content extra textAlign='center' >
                <Button name={feedback.feedbackID}
                    loading={loading && target === feedback.feedbackID}
                    onClick={() => setOpenConfirm(true)}
                    content='Fshije' className='detailsbtn' color='google plus' />
                <Confirm
                    content='A jeni i sigurt se doni ta fshini?'
                    open={openConfirm}
                    onCancel={() => setOpenConfirm(false)}
                    onConfirm={() => {
                        handleKontaktiDelete(feedback.feedbackID);
                        setOpenConfirm(false);
                    }}
                />
                <Button onClick={cancelSelectedFeedback} color='grey' content='cancel' className='detailsbtn' />

            </Card.Content>
        </Card>

    )
})