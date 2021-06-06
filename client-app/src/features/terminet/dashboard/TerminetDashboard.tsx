import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import TerminiDetails from "../details/TerminiDetails";
import TerminiForm from "../form/TerminiForm";
import TerminiList from "./TerminetList"

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
      <Grid.Column  width="12">
        <TerminiList />
        
      </Grid.Column>

      <GridColumn  width="4">
      <Button
          onClick={() => terminiStore.openForm()}
          positive
          content="Shto Termin"
          size='big'
        />
        {selectedTermin && !editMode && <TerminiDetails />}
        {editMode && <TerminiForm />}
      </GridColumn>
    </Grid>
  );
});
