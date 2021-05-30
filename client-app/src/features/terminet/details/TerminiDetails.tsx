import React from "react";
import { Button, ButtonGroup, Card, Icon } from "semantic-ui-react";
import { Termin } from "../../../app/models/termini";

interface Props {
  termini: Termin;
  cancelSelectTermin: () => void;
  openForm: (id: string) => void;
}

export default function TerminiDetails({
  termini,
  cancelSelectTermin,
  openForm,
}: Props) {
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
            onClick={cancelSelectTermin}
            basic
            color="grey"
            content="Cancel"
          ></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
