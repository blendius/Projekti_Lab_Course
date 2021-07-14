import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import OrariDetails from "../details/OrariDetails";
import OrariForm from "../form/OrariForm";
import OraretList from "./OraretList";

export default observer(function OraretDashboardStudenti() {
  const { orariStore } = useStore();
  const { selectedOrari, editMode } = orariStore;

  useEffect(() => {
    orariStore.loadOraret();
  }, [orariStore]);

  if (orariStore.loadingInitial) {
    return <LoadingComponent content="Loading app" />;
  }

  return (
    <Grid>
      <Grid.Column width="12">
        <OraretList />
      </Grid.Column>
    </Grid>
  );
});
