import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Grid, Item, List } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';





export default observer(function KontaktiProfDashboard() {
    const { kontaktiStore } = useStore();
    const { kontaktetByDate, editMode } = kontaktiStore
    return (
        <List divided relaxed inverted>
            {kontaktetByDate.map(kontakti => (
                <List.Item key={kontakti.kontaktiId}>
                    <List.Icon name='address card' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>{kontakti.subjekti}</List.Header>
                        <div className="data" ><label>Profesori:  </label>  {kontakti.profEmail}</div>
                    </List.Content>
                    <Item.Extra>
                        <Button onClick={() => kontaktiStore.selectKontakti(kontakti.kontaktiId)} floated='right' content='Shiko Detajet' color='blue' />

                    </Item.Extra>

                </List.Item>


            ))}

        </List>
    )
})