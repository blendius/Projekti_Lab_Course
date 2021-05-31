import React from "react";
import { Button, Container, Form, Header } from "semantic-ui-react";

export default function HomePage() {
  return (
    <Container style={{ width: 325, marginTop: "20em" }}>
      <Form>
        <Header style={{ color: "white" }} as="h1">
          Welcome to UBT School
        </Header>
        <Form.Field>
          <label style={{ color: "white" }}>Email:</label>
          <input placeholder="Email" />
        </Form.Field>
        <Form.Field>
          <label style={{ color: "white" }}>Password:</label>
          <input placeholder="Password" />
        </Form.Field>
        <Form.Field></Form.Field>
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}
