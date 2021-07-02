import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Item, List } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';



export default observer(function PajisjetList() {
    const { pajisjetStore } = useStore();
    const { laburatoriStore } = useStore();
    const { pajisjetByDate } = pajisjetStore;
    const { } = laburatoriStore;

    return (
        <List divided relaxed inverted>
            {pajisjetByDate.map(pajisja => (
                <List.Item key={pajisja.PajisjaId}>
                    <List.Icon name='address card' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>{pajisja.emriPajisjes}</List.Header>
                        <div className="data" ><label>Lenda:  </label>  {pajisja.LaburatioriId}</div>
                    </List.Content>
                    <Item.Extra>
                        <Button onClick={() => pajisjetStore.selectPajisja(pajisja.PajisjaId)} floated='right' content='Shiko Detajet' color='blue' />

                    </Item.Extra>

                </List.Item>


            ))}

        </List>
    )
})