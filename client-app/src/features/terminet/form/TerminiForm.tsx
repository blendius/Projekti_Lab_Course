import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
interface Props {
  closeForm: () => void;
}

export default function TerminiForm({ closeForm }: Props) {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Data E Fillimit" />
        <Form.Input placeholder="Data E Mbarimit" />
        <Form.Input placeholder="Koha e mbajtjes" />
        <Form.Input placeholder="Salla" />
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
