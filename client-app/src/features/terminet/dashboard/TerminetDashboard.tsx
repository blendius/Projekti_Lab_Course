import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, GridColumn, List } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import TerminiDetails from "../details/TerminiDetails";
import TerminiForm from "../form/TerminiForm";
import TerminiList from "./TerminetList";

export default observer(function TerminetDashboard() {
  const { terminiStore } = useStore();
  const { selectedTermin, editMode } = terminiStore;
  return (
    <Grid>
      <Grid.Column floated="right" width="4">
        <TerminiList />
      </Grid.Column>

      <GridColumn floated="right" width="4">
        {selectedTermin && !editMode && <TerminiDetails />}
        {editMode && <TerminiForm />}
      </GridColumn>
    </Grid>
  );
});
