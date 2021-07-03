import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Card, Image, Label, List, Segment, Table, TableBody, TableCell } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';


export default observer(function KontaktiDetais() {
    const { kontaktiStore } = useStore();
    const { deleteKotakti, loading } = kontaktiStore

    const { selectedKontakti: kontakti, openForm, cancelSelectedKontakti } = kontaktiStore;

    const [target, setTarget] = useState('');

    function handleKontaktiDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteKotakti(id)
    }

    if (!kontakti) return <LoadingComponent />

    return (
        <Card>
            <Label color='grey'>
                Subjekti
            </Label>
            <Card.Content header={kontakti.subjekti} />
            <Label as='a' color='grey'>
                Mesazhi
            </Label>
            <Card.Content description={kontakti.mesazhi} />
            <Card.Content extra textAlign='center'>
                {kontakti.profEmail}  ,
                {kontakti.dataEDergimit}
            </Card.Content>
        </Card>

    )
})