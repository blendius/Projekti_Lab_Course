import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Item, List, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';



export default observer(function PajisjetList() {
    const { pajisjetStore } = useStore();
    const { laburatoriStore } = useStore();
    const { pajisjetByDate,loading } = pajisjetStore;
    const { } = laburatoriStore;

    return (
        <Segment>
            <Item.Group divided>
                {pajisjetByDate.map(pajisjet => (
                    <Item key={pajisjet.pajisjaId}>
                        <Item.Content>
                            <Item.Header as='a'>Emri: {pajisjet.emriPajisjes}</Item.Header>
                            <Item.Description>{pajisjet.kodiProduktit}</Item.Description>
                            <Item.Meta>Data: {pajisjet.dataEShtimit}</Item.Meta>

                            <Item.Extra>
                                <Button onClick={() => pajisjetStore.selectPajisja(pajisjet.pajisjaId)} floated='right' content='Shiko Detajet' color='blue' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
       
    )
})