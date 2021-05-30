import React, { Fragment, useEffect, useState } from "react";

import axios from "axios";
import { Container, List } from "semantic-ui-react";
import ShowProfessors from "../../features/profesoret/profesoret";
import NavBar from "./NavBar";
import { Route } from "react-router";
import HomePage from "../../features/home/homePage";
import { Termin } from "../models/termini";

function App() {
  const [postimet, setPostimet] = useState([]);
  const [terminet, setTerminet] = useState<Termin[]>([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Termin[]>("http://localhost:5000/api/Terminet")
      .then((response) => {
        setTerminet(response.data);
        console.log(response);
      });
  }, []);
  function handleFormOpen(id?: string) {
    setEditMode(true);
  }
  function handleFormClose() {
    setEditMode(false);
  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/Postimet").then((response) => {
      setPostimet(response.data);
      console.log(response);
    });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        {/* <List>
          {postimet.map((postimi: any) => (
            <li key={postimi.id}>
              {postimi.titulli}
            </li>

          ))}
        </List> */}

        {/* <ShowProfessors /> */}
        <Route exact path="/" component={HomePage} />
        <Route path="/profesoret" component={ShowProfessors} />
      </Container>
    </Fragment>
  );
}

export default App;
