import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { Nxenesi } from '../../../app/models/nxenesi';
import NxenesiList from './NxenesiList';
import NxenesiModal from './NxenesiModal';
import './style.css'

export default function NxenesiDashboard() {

    const [open, setOpen] = React.useState(false)

    const [nxenesit, setNxenesit] = useState<Nxenesi[]>([]);
    useEffect(()=>{
    axios.get<Nxenesi[]>("http://localhost:5000/api/Nxenesi").then(response =>{
        setNxenesit(response.data);
        console.log(response);
    })
    },[])
    const nxenesi = nxenesit[0] || {}
    return (
        <>
            <Segment>
                <Grid>
                    <NxenesiList nxenesi={nxenesi}/>
                </Grid>
                <Button primary onClick={()=> setOpen(true)}>Edit</Button>
            </Segment>
            <NxenesiModal open={open} setOpen = {setOpen} nxenesi={nxenesi}/>
        </>
    )
}