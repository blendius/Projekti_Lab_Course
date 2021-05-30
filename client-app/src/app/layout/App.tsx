import React, { Fragment, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { Container, List } from "semantic-ui-react";
import ShowProfessors from "../../features/profesoret/profesoret";
import NavBar from "./NavBar";
import { Route } from "react-router";
import HomePage from "../../features/home/homePage";
import { Termin } from "../models/termini";
import TerminetDashboard from "../../features/terminet/dashboard/TerminetDashboard";

function App() {
  const [postimet, setPostimet] = useState([]);
  const [terminet, setTerminet] = useState<Termin[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedTermin, setSelectedTermin] =
    useState<Termin | undefined>(undefined);

  function handleDeleteTermini(id: string) {
    setTerminet([...terminet.filter((x) => x.id != id)]);
  }

  useEffect(() => {
    axios
      .get<Termin[]>("http://localhost:5000/api/Terminet")
      .then((response) => {
        setTerminet(response.data);
        console.log(response);
      });
  }, []);
  function handleSelectTermin(id: string) {
    setSelectedTermin(terminet.find((x) => x.id === id));
  }

  function handleCancelSelectTermin() {
    setSelectedTermin(undefined);
  }
  function handleFormOpen(id?: string) {
    id ? handleSelectTermin(id) : handleCancelSelectTermin();
    setEditMode(true);
  }
  function handleFormClose() {
    setEditMode(false);
  }
  function handleCreateOrEditTermin(termini: Termin) {
    termini.id
      ? setTerminet([...terminet.filter((x) => x.id !== termini.id), termini])
      : setTerminet([...terminet, { ...termini, id: uuid() }]);
    setEditMode(false);
    setSelectedTermin(termini);
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
        <TerminetDashboard
          terminet={terminet}
          editMode={editMode}
          closeForm={handleFormClose}
          openForm={handleFormOpen}
          selectedTermin={selectedTermin}
          selectTermin={handleSelectTermin}
          cancelSelectTermin={handleCancelSelectTermin}
          createOrEdit={handleCreateOrEditTermin}
          deleteTermini={handleDeleteTermini}
        />
        <Route exact path="/" component={HomePage} />
        <Route path="/profesoret" component={ShowProfessors} />
      </Container>
    </Fragment>
  );
}

export default App;
