import { observer } from 'mobx-react-lite';
import { Button, Item, List } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import KontaktiDetails from '../details/KontaktiDetails';



export default observer(function KontaktiListReply() {
    const { kontaktiStore, profesoriStore} = useStore();
    const { kontaktetReplyByDate, selectedKontakti, editMode } = kontaktiStore
    return (
        <List divided relaxed >
            {kontaktetReplyByDate.map(kontakti => (
                <List.Item key={kontakti.kontaktiId}>
                    <List.Icon name='inbox' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>{kontakti.subjekti}</List.Header>
                        <div className="data" ><label>Profesori:  </label>  {profesoriStore.getEmriProfById(kontakti.profesoriId)}</div>
                    </List.Content>
                    <Item.Extra>
                        <Button onClick={() => kontaktiStore.selectKontaktiReply(kontakti.kontaktiId) } floated='right' content='Shiko Detajet' color='blue' />
                      
                    </Item.Extra>

                </List.Item>


            ))}

        </List>
    )
})