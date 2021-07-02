import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { Njoftimi } from '../../../app/models/njoftimi';
import { useStore } from '../../../app/stores/store';
import List from './List';
//import './style.css'


export default observer(function DashboardNjoftimi() {
    const { njoftimiStore } = useStore();

    const { njoftimet} = njoftimiStore;

    useEffect(() => {
        njoftimiStore.loadNjoftimet();
      }, [njoftimiStore]);

    //console.log("njoftimet:", njoftimet);
    return (
        <>
          <h1 style={{textAlign: "center", color: "#2B547E"}}> Njoftimet </h1>
          {njoftimet.map(njoftimi => (
            <Segment key={njoftimi.njoftimiId}>
                <Grid> 
                    <List njoftimi={njoftimi}/>
                </Grid>
            </Segment>))}
        </>
    )
})