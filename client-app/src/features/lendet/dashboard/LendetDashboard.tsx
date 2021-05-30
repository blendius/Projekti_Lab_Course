//import react from 'react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Button, Container, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import LendetDetails from '../details/LendetDetails';
import LendetList from './LendetList';
import LendetForm from '../form/LendaForm';
import { useLocation } from 'react-router';



export default observer (function LendetDashboard() {
    const {lendaStore} =useStore();
    const{selectedLenda,editMode,openForm} =lendaStore;



    useEffect(() => {
        lendaStore.loadLendet();
        
      }, [lendaStore])
    
      if (lendaStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return (
        <Grid>
            <Grid.Column width='12' >
            {/* as={Link} to="/krijoLende" */}
            
                <LendetList/>
                
            </Grid.Column>
            <Grid.Column width='4'>
                <Container>
                <Button  onClick={() => openForm()} color='green' content='Krijo Lende' size='big' ></Button>
                </Container>
            
                <h2>Te Dhenat Per Lenden:</h2>
                
                {selectedLenda && !editMode &&
                    <LendetDetails
                    />}
                {editMode &&
                    <LendetForm
                    />}
                    

            </Grid.Column>
        </Grid>
    )
})