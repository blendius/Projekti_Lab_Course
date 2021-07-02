import React from 'react';
import {  Grid } from 'semantic-ui-react';
import { Libri } from '../../../app/models/libri';
import { useStore } from '../../../app/stores/store';

interface Props {
    libri: Libri;
}
export default function ListLibri({libri}: Props) {
   

    return(
    <>

        <Grid.Row>
            <Grid.Column>
            <h2 style={{textAlign: "center"}}>Libri "{libri?.titulli}" i shkruar nga {libri?.autori}</h2>
            <h5 style={{textAlign: "center"}}>Libri parashihet për klasën {libri?.klasa} dhe lëndën {libri?.lendaString}</h5>
            <p style={{textAlign: "justify"}}>Pershkrim i shkurter i librit: {libri.pershkrimi}</p>
            <h4 style={{textAlign: "justify", fontFamily: "italic"}}>Linku: <a>{libri?.linku}</a></h4>
    
            </Grid.Column>
        </Grid.Row>
        </>
    )
}