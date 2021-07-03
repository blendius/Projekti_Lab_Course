import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Card, Image, List } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';

export default observer(function FamiljaDetais() {
    const { familjaStore, prindiStore, nxenesiStore } = useStore();
    const { deleteFamilja, loading } = familjaStore

    const { selectedFamilja: familja, openForm, cancelSelectedFamilja } = familjaStore;


    const { getEmriPrinditById } = prindiStore;
    const { getEmriNxenesitById } = nxenesiStore;

    const [target, setTarget] = useState('');

    function handleFamiljaDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteFamilja(id)
    }

    if (!familja) return <LoadingComponent />

    return (
        <Card fluid >
            <Card.Content>
                <Card.Header >{getEmriPrinditById(familja.prindiId)}</Card.Header>
                <Card.Description>Femija: {getEmriNxenesitById(familja.nxenesiId)}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                    <Button name={familja.familjaId}
                        loading={loading && target === familja.familjaId}
                        onClick={(e) => handleFamiljaDelete(e, familja.familjaId)}
                        content='Fshije' color='red' />
                    <Button onClick={cancelSelectedFamilja} color='instagram' content='Cancel' />
                    <Button onClick={() => openForm(familja.familjaId)} color='facebook' floated='right' content='Edit' />
            </Card.Content>
        </Card>
    )
})