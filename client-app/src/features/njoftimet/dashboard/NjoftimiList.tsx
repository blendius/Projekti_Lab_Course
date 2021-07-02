import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Confirm, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer(function NjoftimiList() {
    const [target, setTarget] = useState('');
    const [openConfirm, setOpenConfirm] = useState(false)
    const {njoftimiStore} = useStore();
    const {deleteNjoftimin, njoftimet, loading} = njoftimiStore;
    
    function handleNjoftimiDelete(e: any, id: string) {
        setTarget(e.target.name);
        deleteNjoftimin(id);
    }
    return(
    <Segment>
            <Item.Group divided>
                {njoftimet.map(njoftimi => (
                    <Item key={njoftimi.njoftimiId}>
                        <Item.Content>
                            <Item.Header as='a'>Njofim: {njoftimi.titulli}</Item.Header>
                            <Item.Description>{njoftimi.pershkrimi}</Item.Description>
                            <Item.Meta>Data: {njoftimi.dataEShtimit}</Item.Meta>
                           
                            <Item.Extra>
                                <Button onClick={() => njoftimiStore.selectNjoftimin(njoftimi.njoftimiId)} floated='right' content='Shiko detajet' color='blue'/>
                                <Button  
                                    name={njoftimi.njoftimiId}
                                    loading={loading && target === njoftimi.njoftimiId} 
                                    onClick={(e) => setOpenConfirm(true)} 
                                    floated='right' 
                                    content='Fshij' 
                                    color='red' />
                                    <Confirm 
                                        content='A jeni i sigurt se doni ta fshini?'
                                        open={openConfirm} 
                                        onCancel={() => setOpenConfirm(false)}
                                        onConfirm={(e) => {
                                            handleNjoftimiDelete(e, njoftimi.njoftimiId); 
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