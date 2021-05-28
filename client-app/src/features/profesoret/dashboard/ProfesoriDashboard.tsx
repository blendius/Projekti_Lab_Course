import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { Profesori } from '../../../app/models/profesori';
import ProfesoriDetais from '../details/ProfesoriDetails';
import ProfesoriForm from '../form/ProfesoriForm';
import ShowProfessors from '../profesoret';
import ProfesoriList from './ProfesoriList';

interface Props {
    profesoret: Profesori[];
    selectedProfessor: Profesori | undefined;
    selectProfessor: (id: string) => void;
    cancelSelectProfessor: () => void;
    editMode: boolean;
    openForm: (id: string | undefined) => void
    openForm2: () => void;
    closeForm: () => void;
    showProfMode: () => void;
    profMode: boolean
    createOrEdit: (profesori: Profesori) => void;
    deleteProfessor:(id:string)=>void;
    submitting:boolean;
}

export default function ProfesoriDashboard({ profesoret, selectedProfessor, selectProfessor, cancelSelectProfessor, editMode, openForm, openForm2, closeForm, showProfMode, profMode, createOrEdit,deleteProfessor, submitting }: Props) {

    return (
        <Grid>
            <Grid.Column width='8'>
                <ProfesoriList profesoret={profesoret} 
                selectProfessor={selectProfessor} 
                 deleteProfessor={deleteProfessor}
                 submitting={submitting} />
                <Button onClick={openForm2} positive content="Shto Profesorin" />


            </Grid.Column>
            <Grid.Column width='8'>
                {selectedProfessor && !editMode &&

                    <ProfesoriDetais
                        profesori={selectedProfessor}
                        cancelSelectProfessor={cancelSelectProfessor}
                        openForm={openForm}

                    ></ProfesoriDetais>}
                {editMode &&
                    <ProfesoriForm closeForm={closeForm} profesori={selectedProfessor} createOrEdit={createOrEdit} submitting={submitting} />}
                {profMode &&
                    <ShowProfessors />}

            </Grid.Column>
        </Grid>
    )
}