import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Segment } from 'semantic-ui-react';
import { Profesori } from '../../../app/models/profesori';

interface Props{
    profesoret: Profesori[];
    selectProfessor: (id: string) => void;
    deleteProfessor:(id:string)=>void;
    submitting:boolean;
}

export default function ProfesoriList({profesoret, selectProfessor, deleteProfessor, submitting}: Props){

    const[target, setTarget]=useState('');

    function handleProfessorDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteProfessor(id)
    }

    return(
    <Segment>
        <Item.Group divided>
            {profesoret.map(profesori =>(
                <Item key={profesori.id}>
                    <Item.Content>
                        <Item.Header as='a'>{profesori.name}</Item.Header>
                        <Item.Description>
                            
                            
                            <div><label className="data">Lenda:  </label>  {profesori.lenda}</div>
                            <div><label className="data">Email zyrtare:  </label>  {profesori.email}</div>
                            <div><label className="data">Grada Akademike:</label> {profesori.gradaAkademike}</div>
                            <Item.Meta>Data e regjistrimit: {profesori.dataRegjistrimit}</Item.Meta>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={()=>selectProfessor(profesori.id)} floated ='right' content='Shiko' color='blue'/>
                                <Button name={profesori.id} loading={submitting && target===profesori.id}  onClick={(e)=>handleProfessorDelete(e,profesori.id)} floated ='right' content='Fshije' color='red'/>

                            </Item.Extra>
                        
                    </Item.Content>
                </Item>
            
            ))}

        </Item.Group>
    </Segment>
)
}