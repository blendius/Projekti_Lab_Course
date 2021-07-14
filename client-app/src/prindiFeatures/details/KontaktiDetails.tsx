import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { Button, Card, Confirm, Label } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';


export default observer(function KontaktiDetais() {
    const { kontaktiStore, profesoriStore } = useStore();
    const { deleteKotakti } = kontaktiStore

    const { selectedKontakti: kontakti, loading, cancelSelectedKontakti } = kontaktiStore;

    const [target, setTarget] = useState('');
    const [openConfirm, setOpenConfirm] = useState(false)

    function handleKontaktiDelete(id: string) {
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

                {profesoriStore.getEmriProfById(kontakti.profesoriId)}  ,
                {kontakti.dataEDergimit}
            </Card.Content>
            <Card.Content extra textAlign='center' >
                <Button name={kontakti.kontaktiId}
                    loading={loading && target === kontakti.kontaktiId}
                    onClick={() => setOpenConfirm(true)}
                    content='Fshije' className='detailsbtn' color='google plus' />
                <Confirm
                    content='A jeni i sigurt se doni ta fshini?'
                    open={openConfirm}
                    onCancel={() => setOpenConfirm(false)}
                    onConfirm={() => {
                        handleKontaktiDelete(kontakti.kontaktiId);
                        setOpenConfirm(false);
                    }}
                />
                <Button onClick={cancelSelectedKontakti} color='grey' content='cancel' className='detailsbtn' />

            </Card.Content>
        </Card>

    )
})