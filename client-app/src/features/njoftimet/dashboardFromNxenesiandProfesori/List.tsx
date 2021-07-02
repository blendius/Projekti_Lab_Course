import React from 'react';
import {  Grid } from 'semantic-ui-react';
import { Njoftimi } from '../../../app/models/njoftimi';
import { Nxenesiuser, NxenesiuserFormValues } from '../../../app/models/nxenesiuser';
import { useStore } from '../../../app/stores/store';

interface Props {
    njoftimi: Njoftimi;
}
export default function List({njoftimi}: Props) {
   

    return(
    <>

        <Grid.Row>
            <Grid.Column>
            <h2 style={{textAlign: "center"}}>{njoftimi?.titulli}</h2>
            <p style={{textAlign: "justify"}}>{njoftimi?.pershkrimi}</p>
            <h3 style={{textAlign: "right", fontStyle: "italic"}}>Data: {njoftimi?.dataEShtimit} </h3>
            
            </Grid.Column>
        </Grid.Row>
        </>
    )
}