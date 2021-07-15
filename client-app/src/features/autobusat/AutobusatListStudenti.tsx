import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Confirm, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";



export default observer(function AutobusatListStudenti() {
    const [target, setTarget] = useState('');
    const [openConfirm, setOpenConfirm] = useState(false)
    const { autobusiStore } = useStore();
    const { deleteAutobusi, getAutobusat, loading } = autobusiStore;

    function handleAktivitetiDelete(e: any, id: string) {
        setTarget(e.target.name);
        deleteAutobusi(id);
    }
    return (
        <Segment>
            <Item.Group divided>
                {getAutobusat.map(autobusi => (
                    <Item key={autobusi.autobusiId}>
                        <Item.Content>
                            <Item.Header as='a'>Autobusi me targat: {autobusi.targat}</Item.Header>
                            <Item.Meta>Brendi : {autobusi.brendi}</Item.Meta>
                            <Item.Meta>Ora e nisjes : {autobusi.oraNisjes}</Item.Meta>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})