import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ProfModal from '../profesoret/profProfile/profModal';
import AdminProfile from './AdminProfile';
//import '../../style.css'

export default observer(function AdminProfileDashboard() {
    const { commonStore, adminStore } = useStore();

    const [open, setOpen] = React.useState(false)


    const Profesori = adminStore.user;



    return (
        <>
            <Segment>
                <Grid>
                    <AdminProfile />
                </Grid>
                <Button primary onClick={() => setOpen(true)}>Edit</Button>
            </Segment>
        </>
    )
})