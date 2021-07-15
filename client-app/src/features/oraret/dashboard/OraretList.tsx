import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import {
  Button,
  Item,
  Segment,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function OraretList() {
  const { orariStore } = useStore();
  const { getOraret, deleteOrari, loading } = orariStore;

  const [target, setTarget] = useState("");
  function handleOrariDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteOrari(id);
  }

  return (
    <Segment clearing>
      <Item.Group divided relaxed>
        {getOraret.map((orari) => (
          <Table key={orari.orariId} celled compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Ora</Table.HeaderCell>
                <Table.HeaderCell>E Hene</Table.HeaderCell>
                <Table.HeaderCell>E Marte</Table.HeaderCell>
                <Table.HeaderCell>E Merkure</Table.HeaderCell>
                <Table.HeaderCell>E Enjte</Table.HeaderCell>
                <Table.HeaderCell>E Premte</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>{orari.hene1}</Table.Cell>
                <Table.Cell>{orari.marte1}</Table.Cell>
                <Table.Cell>{orari.merkure1}</Table.Cell>
                <Table.Cell>{orari.enjte1}</Table.Cell>
                <Table.Cell>{orari.premte1}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>2</Table.Cell>
                <Table.Cell>{orari.hene2}</Table.Cell>
                <Table.Cell>{orari.marte2}</Table.Cell>
                <Table.Cell>{orari.merkure2}</Table.Cell>
                <Table.Cell>{orari.enjte2}</Table.Cell>
                <Table.Cell>{orari.premte2}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>3</Table.Cell>
                <Table.Cell>{orari.hene3}</Table.Cell>
                <Table.Cell>{orari.marte3}</Table.Cell>
                <Table.Cell>{orari.merkure3}</Table.Cell>
                <Table.Cell>{orari.enjte3}</Table.Cell>
                <Table.Cell>{orari.premte3}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>4</Table.Cell>
                <Table.Cell>{orari.hene4}</Table.Cell>
                <Table.Cell>{orari.marte4}</Table.Cell>
                <Table.Cell>{orari.merkure4}</Table.Cell>
                <Table.Cell>{orari.enjte4}</Table.Cell>
                <Table.Cell>{orari.premte4}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>5</Table.Cell>
                <Table.Cell>{orari.hene5}</Table.Cell>
                <Table.Cell>{orari.marte5}</Table.Cell>
                <Table.Cell>{orari.merkure5}</Table.Cell>
                <Table.Cell>{orari.enjte5}</Table.Cell>
                <Table.Cell>{orari.premte5}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>6</Table.Cell>
                <Table.Cell>{orari.hene6}</Table.Cell>
                <Table.Cell>{orari.marte6}</Table.Cell>
                <Table.Cell>{orari.merkure6}</Table.Cell>
                <Table.Cell>{orari.enjte6}</Table.Cell>
                <Table.Cell>{orari.premte6}</Table.Cell>
              </Table.Row>
            </Table.Body>
            <Button
              onClick={() => orariStore.selectOrari(orari.orariId)}
              floated="right"
              content="View"
              color="blue"
            />
            <Button
              name={orari.orariId}
              loading={loading && target === orari.orariId}
              onClick={(e) => handleOrariDelete(e, orari.orariId)}
              floated="right"
              content="Delete"
              color="red"
            />
          </Table>
        ))}
      </Item.Group>
    </Segment>
  );
});