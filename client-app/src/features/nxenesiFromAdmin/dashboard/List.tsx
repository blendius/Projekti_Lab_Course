import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Confirm, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import './style.css';

export default observer(function List() {
    const {nxenesiStore} = useStore();
    const {deleteNxenesin, nxenesitByDate, loading, selectNxenesin } = nxenesiStore;
    const [target, setTarget] = useState('');
    const [openConfirm, setOpenConfirm] = useState(false)

    function handleNxenesiDelete(id: string) {
        deleteNxenesin(id);
    }

   
   
    return (
        <Segment>
            <Item.Group divided>
                {nxenesitByDate.map(nxenesi => (
                    <Item key = {nxenesi.id}>
                        <Item.Content>
                            <Item.Header as='a'>{nxenesi.fullName}</Item.Header>
                
                            <Item.Description>
                                <div><label>Email: </label>{nxenesi.email}</div>
                                <div><label>Klasa: </label>{nxenesi.class}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => nxenesiStore.selectNxenesin(nxenesi.id)} floated='right' content='Shiko detajet' color='blue'/>
                                <Button 
                                    name={nxenesi.id}
                                    loading={loading && target == nxenesi.id} 
                                    onClick={() => setOpenConfirm(true)} 
                                    floated='right' 
                                    content='Fshij' 
                                    color='red'/>
                                    <Confirm 
                                        content='A jeni i sigurt se doni ta fshini?'
                                        open={openConfirm} 
                                        onCancel={() => setOpenConfirm(false)}
                                        onConfirm={() => {
                                            handleNxenesiDelete(nxenesi.id); 
                                            setOpenConfirm(false);
                                        }}
                                    />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})