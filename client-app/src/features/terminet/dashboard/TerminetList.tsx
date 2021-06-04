import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function TerminiList() {
  const { terminiStore } = useStore();
  const { terminetByDate, deleteTermini, loading } = terminiStore;

  const [target, setTarget] = useState("");
  function handleTerminiDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteTermini(id);
  }

  return (
    <Segment clearing>
      <Item.Group divided relaxed inverted>
        {terminetByDate.map((termini) => (
          <Item key={termini.id}>
            <Item.Content>
              <Item.Header>Lenda Standin</Item.Header>
              <Item.Meta>Nga Data: {termini.dataFillimit}</Item.Meta>
              <Item.Meta>Deri me daten: {termini.dataMbarimit}</Item.Meta>
              <Item.Meta>{termini.kohaMbajtjes}</Item.Meta>
              <Item.Meta>Salla:{termini.salla}</Item.Meta>
              <Item.Extra>
                <Button
                  onClick={() => terminiStore.selectTermini(termini.id)}
                  floated="right"
                  content="Shiko"
                  color="twitter"
                />
                <Button
                  name={termini.id}
                  loading={loading && target === termini.id}
                  onClick={(e) => handleTerminiDelete(e, termini.id)}
                  floated="right"
                  content="Fshij"
                  color="red"
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});
