import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import TerminiDetails from "../details/TerminiDetails";
import TerminiForm from "../form/TerminiForm";
import TerminiList from "../dashboard/TerminetList"

export default observer(function TerminetDashboard() {
  const { terminiStore } = useStore();
  const { selectedTermin, editMode } = terminiStore;

  useEffect(() => {
    terminiStore.loadTerminet();
  }, [terminiStore]);

  if (terminiStore.loadingInitial) {
    return <LoadingComponent content="Loading app" />;
  }

  return (
    <Grid>
      <Grid.Column floated="right" width="4">
        <TerminiList />
        <Button
          onClick={() => terminiStore.openForm()}
          positive
          content="Shto Termin"
        />
      </Grid.Column>

      <GridColumn floated="right" width="4">
        {selectedTermin && !editMode && <TerminiDetails />}
        {editMode && <TerminiForm />}
      </GridColumn>
    </Grid>
  );
});
