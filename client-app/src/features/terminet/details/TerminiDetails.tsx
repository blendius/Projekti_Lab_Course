import React from "react";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function TerminiDetails() {
  const { terminiStore } = useStore();
  const {
    selectedTermin: termini,
    openForm,
    cancelSelectedTermini,
  } = terminiStore;

  if (!termini) return <LoadingComponent />;

  return (
    <Card>
      <Card.Content>
        <Card.Header>Lenda Standin</Card.Header>
        <Card.Meta>
          <span>{termini.dataFillimit}</span>
          <span>{termini.dataMbarimit}</span>
        </Card.Meta>
        <Card.Description>Salla:{termini.salla}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(termini.id)}
            basic
            color="blue"
            content="Edit"
          ></Button>
          <Button
            onClick={cancelSelectedTermini}
            basic
            color="grey"
            content="Cancel"
          ></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
