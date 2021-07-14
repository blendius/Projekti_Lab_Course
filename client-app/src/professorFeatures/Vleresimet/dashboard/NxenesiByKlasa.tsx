import { observer } from 'mobx-react-lite';
import { Button, Item, List } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';





export default observer(function NxenesiByKlasa() {
    const { vleresimiStore } = useStore();
    const {  NxenesiSortByEmri } = vleresimiStore
    return (
        <List divided relaxed >
            {NxenesiSortByEmri.map(nxenesi => (
                <List.Item key={nxenesi.id}>
                    <List.Content>
                        <List.Header as='a'>{nxenesi.fullName ?? nxenesi.email }
                        <Button onClick={() => vleresimiStore.openFormNxenesi(nxenesi.id)}  positive content="Vendos Noten" style={{margin:30}}/></List.Header>
                        
                    </List.Content>
                    <Item.Extra>


                    </Item.Extra>

                </List.Item>


            ))}

        </List>
    )
})