import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Profesori } from '../../../app/models/profesori';
interface Props {
    profesori: Profesori
    cancelSelectProfessor: () => void;
    openForm:(id:string)=>void;
}
export default function ProfesoriDetais({ profesori ,cancelSelectProfessor,openForm}: Props) {
    return (
        <Card fluid>
            <Image src={`/images/ProfImg/${profesori.name}.jpg`} />
            <Card.Content>
                <Card.Header>{profesori.name}</Card.Header>
                <Card.Meta>
                    <span>{profesori.dataRegjistrimit}</span>
                </Card.Meta>
                <Card.Description>
                    <div><label className="data">Lenda:  </label>  {profesori.lenda}</div>
                    <div><label className="data">Email zyrtare:  </label>  {profesori.email}</div>
                    <div><label className="data">Grada Akademike:</label> {profesori.gradaAkademike}</div>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                
                    <Button onClick={()=>openForm(profesori.id)} primary inverted floated='left' content='Edit' className='detailsbtn' />
                    
                    <Button onClick={cancelSelectProfessor} secondary inverted floated='right' content='cancel' className='detailsbtn'/>
               
            </Card.Content>
        </Card>
    )
}