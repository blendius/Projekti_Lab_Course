import React, { SyntheticEvent, useState } from 'react';
import { Button, Card, Image, List } from 'semantic-ui-react';
import { Profesori } from '../../../app/models/profesori';
interface Props {
    profesori: Profesori
    cancelSelectProfessor: () => void;
    openForm:(id:string)=>void;
    deleteProfessor: (id: string) => void;
    submitting: boolean;
}
export default function ProfesoriDetais({ profesori ,cancelSelectProfessor,openForm, deleteProfessor, submitting}: Props) {
    const [target, setTarget] = useState('');

    function handleProfessorDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteProfessor(id)
    }

    return (
        <List>
            <div className='details'>
            <Image src={`/images/ProfImg/${profesori.name}.jpg`} />
            <Card.Content>
                <Card.Description className='teDhena'>
                <Card.Header className='Emri'>{profesori.name}</Card.Header>
                    <div><label className="data">Lenda:  </label>  {profesori.lenda}</div>
                    <div><label className="data">Email zyrtare:  </label>  {profesori.email}</div>
                    <div><label className="data">Grada Akademike:</label> {profesori.gradaAkademike}</div>
                    <div><label className="data">I punesuar nga data: :</label> {profesori.dataRegjistrimit}</div>
                </Card.Description>
            </Card.Content>
            </div>
            <Card.Content extra>
                
                    <Button onClick={()=>openForm(profesori.id)} primary   content='Edit' className='detailsbtn' />
                    <Button name={profesori.id} 
                    loading={submitting && target === profesori.id} 
                    onClick={(e) => handleProfessorDelete(e, profesori.id)} 
                     content='Fshije' className='detailsbtn'  color='red' />
                    <Button onClick={cancelSelectProfessor} color='grey'   content='cancel' className='detailsbtn'/>
                    
            </Card.Content>
        </List>
    )
}