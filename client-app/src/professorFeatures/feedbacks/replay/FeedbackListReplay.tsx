import { observer } from 'mobx-react-lite';
import { Button, Item, List } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';



export default observer(function FeedbackListReplay() {
    const { feedbackStore, profesoriStore } = useStore();
    const { feedbackReplyByDate, selectedFeedback, editMode } = feedbackStore
    return (
        <List divided relaxed >
            {feedbackReplyByDate.map(feedback => (
                <List.Item key={feedback.feedbackID}>
                    <List.Icon name='inbox' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>{feedback.subject}</List.Header>
                        <div className="data" ><label>Profesori:  </label>  {profesoriStore.getEmriProfById(feedback.profesoriId)}</div>
                    </List.Content>
                    <Item.Extra>
                        <Button onClick={() => feedbackStore.selectFeedbackReplay(feedback.feedbackID)} floated='right' content='Shiko Detajet' color='blue' />

                    </Item.Extra>

                </List.Item>


            ))}

        </List>
    )
})