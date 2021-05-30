import React, { Fragment, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { Container } from "semantic-ui-react";
import ShowProfessors from "../../features/profesoret/profesoret";
import NavBar from "./NavBar";
import { Route } from "react-router";
import HomePage from "../../features/home/homePage";
import { Termin } from "../models/termini";
import TerminetDashboard from "../../features/terminet/dashboard/TerminetDashboard";
import agent from "../api/agent";

function App() {
  const [postimet, setPostimet] = useState([]);
  const [terminet, setTerminet] = useState<Termin[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedTermin, setSelectedTermin] =
    useState<Termin | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);

  function handleDeleteTermini(id: string) {
    setSubmitting(true);
    agent.Terminet.delete(id).then(() => {
      setTerminet([...terminet.filter((x) => x.id != id)]);
      setSubmitting(false);
    });
  }

  useEffect(() => {
    agent.Terminet.list().then((response) => {
      let terminet: Termin[] = [];
      response.forEach((termin) => {
        termin.dataFillimit = termin.dataFillimit.split("T")[0];
        termin.dataMbarimit = termin.dataMbarimit.split("T")[0];
        terminet.push(termin);
      });
      setTerminet(terminet);
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
    setSubmitting(true);
    if (termini.id) {
      agent.Terminet.update(termini).then(() => {
        setTerminet([...terminet.filter((x) => x.id !== termini.id), termini]);
        setSelectedTermin(termini);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      termini.id = uuid();
      agent.Terminet.create(termini).then(() => {
        setTerminet([...terminet, { ...termini, id: uuid() }]);
        setSelectedTermin(termini);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/Postimet").then((response) => {
      setPostimet(response.data);
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
