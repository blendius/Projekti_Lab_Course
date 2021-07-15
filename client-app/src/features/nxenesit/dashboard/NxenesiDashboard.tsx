import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { convertCompilerOptionsFromJson } from 'typescript';
import { Nxenesi } from '../../../app/models/nxenesi';
import { useStore } from '../../../app/stores/store';
import NxenesiList from './NxenesiList';
import NxenesiModal from './NxenesiModal';
import './style.css'

export default function NxenesiDashboard() {
    const {nxenesiStore: {nxenesiSelected}} = useStore();
    const [open, setOpen] = React.useState(false)

    const [nxenesi, setNxenesit] = useState<Nxenesi[]>([]);
    return (
        <>
            <Segment>
                <Grid>
                    <NxenesiList nxenesi={nxenesiSelected}/>
                </Grid>
                <Button primary onClick={()=> setOpen(true)}>Edit</Button>
            </Segment>
            <NxenesiModal open={open} setOpen = {setOpen} nxenesi={nxenesiSelected}/>
        </>
    )
}