import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Termin } from "../../../app/models/termini";

interface Props {
  termini: Termin | undefined;
  closeForm: () => void;
  createOrEdit: (termini: Termin) => void;
}

export default function TerminiForm({
  termini: selectedTermini,
  closeForm,
  createOrEdit,
}: Props) {
  const initialState = selectedTermini ?? {
    id: "",
    dataFillimit: "",
    dataMbarimit: "",
    salla: "",
    kohaMbajtjes: "",
  };

  const [termini, setTermini] = useState(initialState);

  function handleSubmit() {
    createOrEdit(termini);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setTermini({ ...termini, [name]: value });
  }
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autocomplete="off">
        <Form.Input
          placeholder="Data E Fillimit"
          type="date"
          value={termini.dataFillimit}
          name="dataFillimit"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Data E Mbarimit"
          type="date"
          value={termini.dataMbarimit}
          name="dataMbarimit"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Koha e mbajtjes"
          value={termini.kohaMbajtjes}
          name="kohaMbajtjes"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Salla"
          value={termini.salla}
          name="salla"
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={closeForm}
          floated="right"
          positive
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
