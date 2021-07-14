import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { Button, Card, Label } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';


export default observer(function KontaktiProfDetails() {
    const { kontaktiStore, profesoriStore, prindiStore } = useStore();
    const { deleteKotakti } = kontaktiStore

    const { selectedKontakti: kontakti, loading } = kontaktiStore;

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

                {prindiStore.getEmriPrinditById(kontakti.prindiId)}  ,
                {kontakti.dataEDergimit}
            </Card.Content>
            <Card.Content extra textAlign='center' >
                <Button name={kontakti.kontaktiId}
                    loading={loading && target === kontakti.kontaktiId}
                    onClick={(e) => handleKontaktiDelete(e, kontakti.kontaktiId)}
                    content='Fshije' className='detailsbtn' color='google plus' />
                <Button onClick={() => kontaktiStore.openForm(kontakti.kontaktiId)} color='instagram' content="Reply" />

            </Card.Content>
        </Card>

    )
})