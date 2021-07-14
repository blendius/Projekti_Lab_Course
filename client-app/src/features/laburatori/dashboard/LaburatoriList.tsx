import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Item, List } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';



export default observer(function LaburatoriList() {
const {laburatoriStore, lendaStore}= useStore();
const {laburatoriByDate}=laburatoriStore;

    return (
        <List divided relaxed >
            {laburatoriByDate.map(laburatori => (
                <List.Item key={laburatori.id}>
                        <List.Content>
                            <List.Header as ='a'>{laburatori.lloji}</List.Header>
                            <div ><label>Lenda:  </label>  {lendaStore.getEmriLendestById(laburatori.lendaId)}</div>
                        </List.Content>
                        <Item.Extra>
                            <Button onClick={() => laburatoriStore.selectLaburatori(laburatori.id)} floated='right' content='Shiko Detajet' color='blue' />
                            
                        </Item.Extra>

                    </List.Item>
                

            ))}

        </List>
    )
})