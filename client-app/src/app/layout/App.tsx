import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Termin } from "../models/termini";
import NavBar from "./NavBar";
import TerminetDashboard from "../../features/terminet/dashboard/TerminetDashboard";

function App() {
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
  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <TerminetDashboard
          terminet={terminet}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
        />
      </Container>
    </>
  );
}

export default App;
