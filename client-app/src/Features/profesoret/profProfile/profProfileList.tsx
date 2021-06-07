import React from 'react';
import { Grid } from 'semantic-ui-react';
//import './style.css';
interface Props {
    profesori: any;
}

export default function ProfProfileList({profesori}: Props) {
  
    return(
    <>
        <Grid.Row>
            <Grid.Column  width={4}>
                <img src="/assets/user.png" alt="logo"/>
            </Grid.Column>
            <Grid.Column width={2   }></Grid.Column>
            <Grid.Column  width={10}>
                <Grid.Row >
                    <h2> {profesori.name}</h2>
                </Grid.Row>
               
                <Grid.Row>
                    <p className='profileData'> Email:      {profesori.email}</p>
                </Grid.Row>
                <Grid.Row>
                    <p className='profileData'> Grada Akademike:   {profesori.gradaAkademike}</p>
                </Grid.Row>
                <Grid.Row>
                    <p className='profileData'>Lenda:   {profesori.lenda}</p>
                </Grid.Row>
                <Grid.Row>
                    <p className='profileData'>Data e regjistrimit:   {profesori.dataRegjistrimit}</p>
                </Grid.Row>
   
            </Grid.Column>
           
        </Grid.Row>
        </>
    )
}