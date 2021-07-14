import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Card, Image, List } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function PajisjetDetais() {
    const { pajisjetStore } = useStore();
    const { deletePajisja, loading } = pajisjetStore

    const { selectedPajisja: pajisja, openForm, cancelselectedPajisja } = pajisjetStore;

    const [target, setTarget] = useState('');

    function handleLaburatoriDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deletePajisja(id)
    }

    if (!pajisja) return <LoadingComponent />

    return (
        <List>
            <div className='details'>
                <Card.Content>
                    <Card.Description className='teDhena'>
                        <Card.Header className='Emri'>{pajisja.emriPajisjes}</Card.Header>
                        <div className="data"><label >Pajisja Kodi:  </label>  {pajisja.kodiProduktit}</div>
                        <div className="data"><label >LaboratoriId:  </label>  {pajisja.laburatioriId}</div>
                        <div className="data"><label>Data e shtimit: :</label> {pajisja.dataEShtimit}</div>
                    </Card.Description>
                </Card.Content>
            </div>
            <Card.Content extra>

                <Button onClick={() => openForm(pajisja.pajisjaId)} primary content='Edit' className='detailsbtn' />
                <Button name={pajisja.pajisjaId}
                    loading={loading && target === pajisja.pajisjaId}
                    onClick={(e) => handleLaburatoriDelete(e, pajisja.pajisjaId)}
                    content='Fshije' className='detailsbtn' color='red' />
                <Button onClick={cancelselectedPajisja} color='grey' content='cancel' className='detailsbtn' />

            </Card.Content>
        </List>
    )
})