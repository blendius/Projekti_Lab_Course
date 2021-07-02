import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid, GridColumn, List } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import NjoftimiDetails from "../details/NjoftimiDetails";
import NjoftimiForm from "../form/NjoftimiForm";
import NjoftimiList from "./NjoftimiList";

export default observer(function NjoftimiDashboard() {
    
    const {njoftimiStore} = useStore();
    const {selectedNjoftimi, editMode} = njoftimiStore;

    useEffect(() => {
      njoftimiStore.loadNjoftimet();
    }, [njoftimiStore]);
   
    if (njoftimiStore.loadingInitial) return <LoadingComponent content='Loading app'/>
   
    return (
        <Grid>
            <GridColumn width='10'>
                <NjoftimiList/>
            </GridColumn>
            <Grid.Column width='6'>
            <Button onClick={() => njoftimiStore.openForm()} positive content="Shto Njoftimin" size='big'/>
                {selectedNjoftimi && !editMode &&
                <NjoftimiDetails/>}
                {editMode &&
                <NjoftimiForm/>}
            </Grid.Column>
        </Grid>
    )
})