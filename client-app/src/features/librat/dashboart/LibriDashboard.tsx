import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import LibriForm from "../form/LibriForm";
import LibriList from "./LibriList";


export default observer(function LibriDashboard() {
    
    const {libriStore, lendaStore} = useStore();
    const {selectedLibri, editMode} = libriStore;

    useEffect(() => {
      libriStore.loadLibrat();
    }, [libriStore]);

    useEffect(() => {
        lendaStore.loadLendet();
      }, [lendaStore])
   
    if (libriStore.loadingInitial) return <LoadingComponent content='Loading app'/>
   
    return (
        <Grid>
            <GridColumn width='15'>
                <LibriList/>
                <Button 
                    onClick={() => libriStore.openForm()} 
                    positive content="Shto Librin" 
                    size='big'
                    icon='book'
                />
            </GridColumn>
            <Grid.Column width='10'>
            {/* <Button onClick={() => libriStore.openForm()} positive content="Shto Librin" size='big'/> */}
                {editMode && 
             <LibriForm/>}
            </Grid.Column>
        </Grid>
    )
})