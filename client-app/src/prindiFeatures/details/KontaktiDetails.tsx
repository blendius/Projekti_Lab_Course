import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Card, Image, List } from 'semantic-ui-react';
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
        <List>
            <div className='details'>
                <Card.Content>
                    <Card.Description className='teDhena'>
                        <Card.Header >{kontakti.subjekti}</Card.Header>
                        <div className="data"><label >Mesaxhi:  </label>  {kontakti.mesazhi}</div>
                        <div className="data"><label >Email i profesorit:  </label>  {kontakti.profEmail}</div>
                        <div className="data"><label >Data e dërgimit:</label> {kontakti.dataEDergimit}</div>
                    </Card.Description>
                </Card.Content>
            </div>
            <Card.Content extra>

                <Button name={kontakti.kontaktiId}
                    loading={loading && target === kontakti.kontaktiId}
                    onClick={(e) => handleKontaktiDelete(e, kontakti.kontaktiId)}
                    content='Fshije' className='detailsbtn' color='red' />
                <Button onClick={cancelSelectedKontakti} color='grey' content='cancel' className='detailsbtn' />

            </Card.Content>
        </List>
    )
})