import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Item, List } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';



export default observer(function FeedbackList() {
    const { feedbackStore, profesoriStore } = useStore();
    const { feedbackByDate } = feedbackStore;
    
    return (
        <List divided relaxed >
            {feedbackByDate.map(feedback => (
                <List.Item key={feedback.feedbackID}>
                    <List.Icon name='envelope' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>{feedback.subject}</List.Header>
                        <div className="data" ><label>Profesori:  </label>  {profesoriStore.getEmriProfById(feedback.profesoriId)}</div>
                    </List.Content>
                    <Item.Extra>
                        <Button onClick={() => feedbackStore.selectFeedback(feedback.feedbackID)} floated='right' content='Shiko Detajet' color='blue' />

                    </Item.Extra>

                </List.Item>


            ))}

        </List>
    )
})