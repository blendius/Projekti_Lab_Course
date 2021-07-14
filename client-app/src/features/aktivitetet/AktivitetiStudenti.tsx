import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Confirm, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";



export default observer(function AktivitetiStudenti() {
    const [target, setTarget] = useState('');
    const [openConfirm, setOpenConfirm] = useState(false)
    const { aktivitetiStore } = useStore();
    const { deleteAktiviteti, getAktivitetet, loading } = aktivitetiStore;

    function handleAktivitetiDelete(e: any, id: string) {
        setTarget(e.target.name);
        deleteAktiviteti(id);
    }
    return (
        <Segment>
            <Item.Group divided>
                {getAktivitetet.map(aktiviteti => (
                    <Item key={aktiviteti.aktivitetiId}>
                        <Item.Content>
                            <Item.Header as='a'>Emri: {aktiviteti.emri}</Item.Header>
                            <Item.Description>{aktiviteti.pershkrimi}</Item.Description>
                            <Item.Meta>Data: {aktiviteti.dataMbajtjes}</Item.Meta>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})