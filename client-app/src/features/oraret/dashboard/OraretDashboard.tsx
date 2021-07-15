import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import OrariDetails from "../details/OrariDetails";
import OrariForm from "../form/OrariForm";
import OraretList from "./OraretList";

export default observer(function OraretDashboard() {
  const { orariStore ,paraleljaStore} = useStore();
  const { selectedOrari, editMode } = orariStore;

  useEffect(() => {
    orariStore.loadOraret();
    paraleljaStore.loadParalelet();
  }, [orariStore]);

  if (orariStore.loadingInitial) {
    return <LoadingComponent content="Loading app" />;
  }

  return (
    <Grid>
      <Grid.Column width="12">
        <OraretList />
      </Grid.Column>

      <GridColumn width="4">
        <Button
          onClick={() => orariStore.openForm()}
          positive
          content="Shto Orar"
          size="big"
        />
        {selectedOrari && !editMode && <OrariDetails />}
        {editMode && <OrariForm />}
      </GridColumn>
    </Grid>
  );
});
