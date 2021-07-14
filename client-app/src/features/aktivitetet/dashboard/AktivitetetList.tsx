import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Confirm, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer(function AktivitetetList() {
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

                            <Item.Extra>
                                <Button onClick={() => aktivitetiStore.selectAktiviteti(aktiviteti.aktivitetiId)} floated='right' content='Shiko detajet' color='blue' />
                                <Button
                                    name={aktiviteti.aktivitetiId}
                                    loading={loading && target === aktiviteti.aktivitetiId}
                                    onClick={(e) => setOpenConfirm(true)}
                                    floated='right'
                                    content='Fshij'
                                    color='red' />
                                <Confirm
                                    content='A jeni i sigurt se doni ta fshini?'
                                    open={openConfirm}
                                    onCancel={() => setOpenConfirm(false)}
                                    onConfirm={(e) => {
                                        handleAktivitetiDelete(e, aktiviteti.aktivitetiId);
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