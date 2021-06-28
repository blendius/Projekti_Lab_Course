import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Card, Image, List } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function LaburatoriDetais() {
    const { laburatoriStore } = useStore();
    const { deleteLaburatori, loading } = laburatoriStore

    const { selectedLaburatori: laburatori, openForm, cancelSelectedLaburatori } = laburatoriStore;

    const [target, setTarget] = useState('');

    function handleLaburatoriDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteLaburatori(id)
    }

    if (!laburatori) return <LoadingComponent />

    return (
        <List>
            <div className='details'>
                <Card.Content>
                    <Card.Description className='teDhena'>
                        <Card.Header className='Emri'>{laburatori.lloji}</Card.Header>
                        <div className="data"><label >Lenda:  </label>  {laburatori.EmriLendes}</div>
                        <div className="data"><label >Numri i Paisjeve:  </label>  {laburatori.nrPaisjeve}</div>
                        <div className="data"><label>Data e krijimit: :</label> {laburatori.dataEKrijimit}</div>
                    </Card.Description>
                </Card.Content>
            </div>
            <Card.Content extra>

                <Button onClick={() => openForm(laburatori.id)} primary content='Edit' className='detailsbtn' />
                <Button name={laburatori.id}
                    loading={loading && target === laburatori.id}
                    onClick={(e) => handleLaburatoriDelete(e, laburatori.id)}
                    content='Fshije' className='detailsbtn' color='red' />
                <Button onClick={cancelSelectedLaburatori} color='grey' content='cancel' className='detailsbtn' />

            </Card.Content>
        </List>
    )
})