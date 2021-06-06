import React from 'react'
import KlubiList from '../dashboard/KlubiList'
import { Button, Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import KlubiForm from '../form/KlubiForm';
import KlubiDetails from '../details/KlubiDetails';
import { observer } from 'mobx-react-lite';

export default observer(function KlubiDashboard(){

    const { klubiStore } = useStore();
    const { selectedKlubi, editMode } = klubiStore

 return( <Grid>
        <Grid.Column width="12">
                <KlubiList/>
        </Grid.Column>

        <Grid.Column width='4'>
             <Button onClick={() => klubiStore.openForm()} positive content="Shto Klubin" size='big' />

                {selectedKlubi && !editMode &&
                    <KlubiDetails />}
                {editMode &&
                    <KlubiForm />}
                

            </Grid.Column>
     </Grid>
 )
})

