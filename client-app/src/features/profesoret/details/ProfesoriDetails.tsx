import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Card, Image, List } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function ProfesoriDetais() {
    const { profesoriStore } = useStore();
    const { deleteProfessor, loading } = profesoriStore

    const { selectedProfessor: profesori, openForm, cancelSelectedProfessor } = profesoriStore;

    const [target, setTarget] = useState('');

    function handleProfessorDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteProfessor(id)
    }

    if (!profesori) return <LoadingComponent />

    return (
        <List>
            <div className='details'>
                <Image src={`/images/ProfImg/${profesori.name}.jpg`} />
                <Card.Content>
                    <Card.Description className='teDhena'>
                        <Card.Header className='Emri'>{profesori.name}</Card.Header>
                        <div className="data"><label >Lenda:  </label>  {profesori.lenda}</div>
                        <div className="data"><label >Email zyrtare:  </label>  {profesori.email}</div>
                        <div className="data"><label >Grada Akademike:</label> {profesori.gradaAkademike}</div>
                        <div className="data"><label>I punesuar nga data: :</label> {profesori.dataRegjistrimit}</div>
                    </Card.Description>
                </Card.Content>
            </div>
            <Card.Content extra>

                <Button onClick={() => openForm(profesori.id)} primary content='Edit' className='detailsbtn' />
                <Button name={profesori.id}
                    loading={loading && target === profesori.id}
                    onClick={(e) => handleProfessorDelete(e, profesori.id)}
                    content='Fshije' className='detailsbtn' color='red' />
                <Button onClick={cancelSelectedProfessor} color='grey' content='cancel' className='detailsbtn' />

            </Card.Content>
        </List>
    )
})