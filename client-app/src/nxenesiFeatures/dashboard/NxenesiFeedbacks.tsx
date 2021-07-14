import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Confirm, Grid, Item, List, Rating, Segment, TextArea } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';





export default observer(function NxenesiFeedbacks() {
    const { feedbackStore, nxenesiStore, profesoriStore } = useStore();
    const { feedbackByDate, deleteFeedback, loading } = feedbackStore;
    const { loadProfesori } = profesoriStore;
    const [target, setTarget] = useState('');
    const [openConfirm, setOpenConfirm] = useState(false)
    const { nxenesiSelected: nxenesi } = nxenesiStore;
    console.log(nxenesi?.email)
    useEffect(() => {


        //nxenesiStore.getNxenesi();

        feedbackStore.loadFeedbacksNxenesi(nxenesi?.email);
        profesoriStore.loadProfesoret();

    }, [feedbackStore])

    function handleFeedbackDelete(id: string) {
        deleteFeedback(id);
    }
    return (
        <Segment>
            <Item.Group divided>
                {feedbackByDate.map(feedback => (
                    <Item key={feedback.feedbackID}>
                        <Item.Content>
                            <Item.Header as='a'>Feedback From Profesor : {feedback.feedbackID}</Item.Header>

                            <Item.Description>

                                <div><label>Email: </label>{feedback.nxenesiEmail}</div>
                                <div><label>Title: </label>{feedback.subject}</div>

                                <div>
                                    <label >Rating :</label>
                                    <Rating disabled maxRating={5} defaultRating={feedback.rating}></Rating>
                                </div>
                                <div><label>Date Sent: </label>{feedback.messageSentDate}</div>

                                <TextArea disabled rows="4" value={feedback.message}>

                                </TextArea>
                            </Item.Description>
                            <Item.Extra>
                                {/* <Button onClick={() => feedbackStore.selectFeedback(feedback.feedbackID)} floated='right' content='Shiko detajet' color='blue' /> */}
                                <Button
                                    name={feedback.feedbackID}
                                    loading={loading && target == feedback.feedbackID}
                                    onClick={() => setOpenConfirm(true)}
                                    floated='right'
                                    content='Fshij'
                                    color='red' />
                                <Confirm
                                    content='Are u sure u want to delete?'
                                    open={openConfirm}
                                    onCancel={() => setOpenConfirm(false)}
                                    onConfirm={() => {

                                        handleFeedbackDelete(feedback.feedbackID);
                                        setOpenConfirm(false);
                                    }}
                                />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
        // <List divided relaxed inverted>
        //     {feedbackByDate.length == 0 ? <h1>U dont have any feedbacks</h1>: feedbackByDate.map(feedback => (

        //         <List.Item key={feedback.feedbackID}>
        //             <List.Icon name='address card' size='large' verticalAlign='middle' />
        //             <List.Content>
        //                 <List.Header as='a'>{feedback.subject}</List.Header>
        //                 <div className="data" ><label>Vlersimi:  </label>  {feedback.rating}</div>
        //             </List.Content>
        //             <Item.Extra>
        //                 {/* <Button onClick={() => feedbackStore.selectfeedback(feedback.feedbackID)} floated='right' content='Shiko Detajet' color='blue' /> */}

        //             </Item.Extra>

        //         </List.Item>


        //     ))}

        // </List>
    )
})