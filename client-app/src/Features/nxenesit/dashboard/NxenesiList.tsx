import React from 'react';
import { Button, Item, Segment, Label, Grid } from 'semantic-ui-react';
import { Nxenesi } from '../../../app/models/nxenesi';
import './style.css';
interface Props {
    nxenesi: Nxenesi;
}

export default function NxenesiList({nxenesi}: Props) {
  
    return(
    <>
        <Grid.Row>
            <Grid.Column  width={4}>
                <img src="/assets/user.png" alt="logo"/>
            </Grid.Column>
            <Grid.Column  width={6}>
                <Grid.Row >
                    <h2> {nxenesi.fullName}</h2>
                </Grid.Row>
                <Grid.Row>
                    <p>Emri i prindit:   {nxenesi.parentName}</p>
                </Grid.Row>
                <Grid.Row>
                    <p>Data e lindjes:   {new Date(nxenesi.dateOfBirth).toLocaleDateString()}</p>
                </Grid.Row>
                <Grid.Row>
                    <p>Klasa:   {nxenesi.class}</p>
                </Grid.Row>
            </Grid.Column>
            <Grid.Column  width={6} className="thirdCol">
                <Grid.Row>
                    <p></p>
                </Grid.Row>
                <Grid.Row>
                    <p> Email:{nxenesi.email}</p>
                </Grid.Row>
                <Grid.Row>
                    <p>Numri i telefonit:   {nxenesi.phoneNumber}</p>
                </Grid.Row>
                <Grid.Row>
                    <p>Viti i regjistrimit:   {nxenesi.yearOfRegistration}</p>
                </Grid.Row>
            </Grid.Column>
        </Grid.Row>
        </>
    )
}