import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Confirm, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer(function AutobusatList() {
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
                    <Item key={autobusi.AutobusiId}>
                        <Item.Content>
                            <Item.Header as='a'>Targa: {autobusi.AutobusiId}</Item.Header>
                            <Item.Header>{autobusi.brendi}</Item.Header>
                            <Item.Meta>Prodhuar ne daten: {autobusi.vitiProdhimit}</Item.Meta>

                            <Item.Extra>
                                <Button onClick={() => autobusiStore.selectAutobusi(autobusi.AutobusiId)} floated='right' content='Shiko detajet' color='blue' />
                                <Button
                                    name={autobusi.AutobusiId}
                                    loading={loading && target === autobusi.AutobusiId}
                                    onClick={(e) => setOpenConfirm(true)}
                                    floated='right'
                                    content='Fshij'
                                    color='red' />
                                <Confirm
                                    content='A jeni i sigurt se doni ta fshini?'
                                    open={openConfirm}
                                    onCancel={() => setOpenConfirm(false)}
                                    onConfirm={(e) => {
                                        handleAktivitetiDelete(e, autobusi.AutobusiId);
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