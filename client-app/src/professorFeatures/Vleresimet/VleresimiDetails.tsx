import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Card, Image, List } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';

export default observer(function VlersimiDetais() {
    const { vleresimiStore } = useStore();
    const { deleteVlersimi, loading } = vleresimiStore

    const { selectedVlersimi: vlersimi, openForm, cancelSelectedVlersimi } = vleresimiStore;

    const [target, setTarget] = useState('');

    function handleVlersimiDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteVlersimi(id)
    }

    if (!vlersimi) return <LoadingComponent />

    return (
        <List>
            <div className='details'>
                <Card.Content>
                    <Card.Description className='teDhena'>
                        <Card.Header className='Emri'>{vlersimi.lenda}</Card.Header>
                        <div className="data"><label >Nota:  </label>  {vlersimi.nota}</div>
                        <div className="data"><label >Gjysemvjetori:  </label>  {vlersimi.gjysemvjetori}</div>
                        <div className="data"><label >Viti:</label> {vlersimi.viti}</div>
                        <div className="data"><label>E vendosur me daten :</label> {vlersimi.dataRegjistrimit}</div>
                    </Card.Description>
                </Card.Content>
            </div>
            <Card.Content extra>

                <Button onClick={() => openForm(vlersimi.vleresimiId)} primary content='Edit' className='detailsbtn' />
                <Button name={vlersimi.vleresimiId}
                    loading={loading && target === vlersimi.vleresimiId}
                    onClick={(e) => handleVlersimiDelete(e, vlersimi.vleresimiId)}
                    content='Fshije' className='detailsbtn' color='red' />
                <Button onClick={cancelSelectedVlersimi} color='grey' content='cancel' className='detailsbtn' />

            </Card.Content>
        </List>
    )
})