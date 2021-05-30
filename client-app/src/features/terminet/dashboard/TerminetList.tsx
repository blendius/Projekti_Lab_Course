import React from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { Termin } from "../../../app/models/termini";

interface Props {
  terminet: Termin[];
  openForm: () => void;
}
export default function TerminiList({ terminet, openForm }: Props) {
  return (
    <Segment clearing>
      <Item.Group divided>
        {terminet.map((termini) => (
          <Item key={termini.id}>
            <Item.Content>
              <Item.Header>Lenda Standin</Item.Header>
              <Item.Meta>Nga Data: {termini.dataFillimit}</Item.Meta>
              <Item.Meta>Deri me daten: {termini.dataMbarimit}</Item.Meta>
              <Item.Meta>{termini.kohaMbajtjes}</Item.Meta>
              <Item.Meta>Salla:{termini.salla}</Item.Meta>
              <Item.Extra>
                <Button
                  onClick={() => openForm()}
                  floated="right"
                  content="Ndrysho"
                  color="twitter"
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
