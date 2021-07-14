import React from "react";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function OrariDetails() {
  const { orariStore } = useStore();
  const { selectedOrari: orari, openForm, cancelSelectedOrari } = orariStore;
  // const { klasaStore } = useStore();
  // const { klasatByVit, getKlasaID } = klasaStore;
  // const { paraleljaStore } = useStore();
  // const { getParaleljaNumribyId } = paraleljaStore;

  if (!orari) return <LoadingComponent />;

  return (
    <Card>
      <Card.Content>
        <Card.Header>{orari.klasaId}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(orari.orariId)}
            basic
            color="blue"
            content="Edit"
          ></Button>
          <Button
            onClick={cancelSelectedOrari}
            basic
            color="grey"
            content="Cancel"
          ></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
