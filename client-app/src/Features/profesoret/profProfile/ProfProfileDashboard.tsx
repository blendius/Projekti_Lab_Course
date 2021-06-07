import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import agent from '../../../app/api/agent';

import { Profesori } from '../../../app/models/profesori';
import ProfModal from './profModal';
import ProfProfileList from './profProfileList';
//import '../../style.css'

export default observer(function ProfProfileDashboard() {

    const [open, setOpen] = React.useState(false)


    const [Profesoret, setProfesoret] = useState<Profesori[]>([]);
    useEffect(() => {
        agent.Profesoret.list().then(response => {
            setProfesoret(response);

        })
    }, [])

    const Profesori = Profesoret[0] || {}
    return (
        <>
            <Segment>
                <Grid>
                    <ProfProfileList profesori={Profesori} />
                </Grid>
                <Button primary onClick={() => setOpen(true)}>Edit</Button>
            </Segment>
            <ProfModal open={open} setOpen={setOpen} Profesori={Profesori} />
        </>
    )
})