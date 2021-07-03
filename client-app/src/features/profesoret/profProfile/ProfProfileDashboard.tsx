import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import agent from '../../../app/api/agent';

import { Professor } from '../../../app/models/professor';
import { useStore } from '../../../app/stores/store';
import ProfModal from './profModal';
import ProfProfileList from './profProfileList';
//import '../../style.css'

export default observer(function ProfProfileDashboard() {
    const { commonStore, profesoriStore } = useStore();

    const [open, setOpen] = React.useState(false)


    const Profesori = profesoriStore.prof;

    

    return (
        <>
            <Segment>
                <Grid>
                    <ProfProfileList />
                </Grid>
                <Button primary onClick={() => setOpen(true)}>Edit</Button>
            </Segment>
            <ProfModal open={open} setOpen={setOpen} />
        </>
    )
})