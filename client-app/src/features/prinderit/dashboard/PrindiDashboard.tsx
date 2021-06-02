import React from 'react';
import {  Button, Grid } from 'semantic-ui-react';
import { Prindi } from '../../../app/models/prindi';
import PrindiForm from '../form/PrindiForm';
import PrindiList from './PrindiList';

interface Props {
    prinderit: Prindi[];
    selectedPrindi: Prindi | undefined;
    selectPrindi: (id: string) => void;
    cancelSelectPrindi: () => void;
    editMode: boolean;
    openForm: (id: string | undefined) => void
    openForm2: ()=>void;
    closeForm: () => void;
  
    createOrEdit: (prindi: Prindi) => void;
    deletePrindi:(id:string)=>void;
    submitting:boolean;
}

export default function PrindiDashboard({ prinderit, selectedPrindi, selectPrindi, cancelSelectPrindi, editMode, openForm,  closeForm,  createOrEdit,deletePrindi, submitting ,openForm2}: Props) {

    return (
        <Grid>
            <Grid.Column width='7'>
                <PrindiList 
                prinderit={prinderit} 
                selectedPrindi={selectPrindi} 
                              
                 deletePrindi={deletePrindi}
                 cancelSelectPrindi={cancelSelectPrindi}
                 openForm={openForm}
                  submitting={submitting}   
                 />
                 
<Button onClick={()=>openForm2()} positive content="Shto Prindin"/>

            </Grid.Column>
           
            <Grid.Column width='8'>
               
                {editMode &&
                    <PrindiForm closeForm={closeForm} prindi={selectedPrindi} createOrEdit={createOrEdit} submitting={submitting} />}
              

            </Grid.Column>
        </Grid>
    )
}