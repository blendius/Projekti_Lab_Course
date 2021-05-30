import React from "react";
import { Grid, GridColumn, List } from "semantic-ui-react";
import { Termin } from "../../../app/models/termini";
import TerminiForm from "../form/TerminiForm";
import TerminiList from "./TerminetList";

interface Props {
  terminet: Termin[];
  editMode: boolean;
  openForm: () => void;
  closeForm: () => void;
}

export default function TerminetDashboard({
  terminet,
  editMode,
  closeForm,
  openForm,
}: Props) {
  return (
    <Grid>
      <Grid.Column floated="right" width="4">
        <TerminiList terminet={terminet} openForm={openForm} />
      </Grid.Column>
      {editMode && (
        <GridColumn floated="right" width="4">
          <TerminiForm closeForm={closeForm} />
        </GridColumn>
      )}
    </Grid>
  );
}
