import React from "react";
import { Grid, GridColumn, List } from "semantic-ui-react";
import { Termin } from "../../../app/models/termini";
import TerminiDetails from "../details/TerminiDetails";
import TerminiForm from "../form/TerminiForm";
import TerminiList from "./TerminetList";

interface Props {
  terminet: Termin[];
  editMode: boolean;
  openForm: () => void;
  closeForm: () => void;
  selectedTermin: Termin | undefined;
  selectTermin: (id: string) => void;
  cancelSelectTermin: () => void;
  createOrEdit: (termini: Termin) => void;
  deleteTermini: (id: string) => void;
}

export default function TerminetDashboard({
  terminet,
  selectTermin,
  selectedTermin,
  cancelSelectTermin,
  editMode,
  closeForm,
  openForm,
  createOrEdit,
  deleteTermini,
}: Props) {
  return (
    <Grid>
      <Grid.Column floated="right" width="4">
        <TerminiList
          terminet={terminet}
          openForm={openForm}
          selectTermin={selectTermin}
          deleteTermini={deleteTermini}
        />
      </Grid.Column>

      <GridColumn floated="right" width="4">
        {selectedTermin && !editMode && (
          <TerminiDetails
            termini={selectedTermin}
            cancelSelectTermin={cancelSelectTermin}
            openForm={openForm}
          />
        )}
        {editMode && (
          <TerminiForm
            closeForm={closeForm}
            termini={selectedTermin}
            createOrEdit={createOrEdit}
          />
        )}
      </GridColumn>
    </Grid>
  );
}
