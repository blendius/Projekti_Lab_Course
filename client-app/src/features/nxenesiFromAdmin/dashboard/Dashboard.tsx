import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Grid} from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import NxenesiDetails from '../details/NxenesiDetails';
import NxenesiFrom from '../form/NxenesiFrom';
import List from './List';



export default observer(function Dashboard() {
    const { nxenesiStore, modalStore} = useStore();
    const {nxenesiSelected,selectedNxenesi, editMode} = nxenesiStore
    useEffect(() => {
        nxenesiStore.loadNxenesit();
    }, [nxenesiStore]);

    if(nxenesiStore.loadingInitial) return <LoadingComponent content='Loading nxenesit...'/>


    return (
        <Grid>
            <Grid.Column width='10'>
                <List/>
            </Grid.Column>
            <Grid.Column width='6'>
            <Button onClick={() => nxenesiStore.openForm2()} positive content="Shto Nxenesin" size='big'/>
            {/* onClick={() => modalStore.openModal(<RegisterFromNxenesi />)} */}

                {selectedNxenesi && !editMode &&
                    <NxenesiDetails
                    />}
                {editMode &&
                    <NxenesiFrom
                    />}
            </Grid.Column>
        </Grid>
    )
})