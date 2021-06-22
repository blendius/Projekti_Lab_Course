import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";
import { Nxenesi } from "../models/nxenesi";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NxenesiDashboard from "../../Features/nxenesit/dashboard/NxenesiDashboard";
import HomePage from "../../Features/home/homePage";
import TerminetDashboard from "../../Features/terminet/dashboard/TerminetDashboard";
import PostimetDashboard from "../../Features/postimet/dashboard/PostimetDashboard";
import PostimetDetails from "../../Features/postimet/details/PostimetDetails";
import ShowPrinderit from "../../Features/prinderit/showPrindi";
import ShowProfessors from "../../Features/profesoret/profesoret";
import LendetDashboard from "../../Features/lendet/dashboard/LendetDashboard";
import LendetDetails from "../../Features/lendet/details/LendetDetails";
import LendaForm from "../../Features/lendet/form/LendaForm";

function App() {
  const [nxenesit, setNxenesit] = useState<Nxenesi[]>([]);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    axios
      .get<Nxenesi[]>("http://localhost:5000/api/Nxenesi")
      .then((response) => {
        setNxenesit(response.data);
      });
  }, []);

  return (
    <Router>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Switch>
          <Route path="/Profili">
            <NxenesiDashboard />
          </Route>
          <Route path="/">
            <Route exact path="/" component={HomePage} />
            <Route path="/profesoret" component={ShowProfessors} />
            <Route path="/terminet" component={TerminetDashboard} />
            <Route exact path="/postimet" component={PostimetDashboard} />
            <Route path="/postimet/:id" component={PostimetDetails} />
            <Route path="/prinderit" component={ShowPrinderit} />
            <Route exact path="/lendet" component={LendetDashboard} />
            <Route path="/lendet/:id" component={LendetDetails} />
            <Route
              path={["/krijoLende", "/manageLenda/:id"]}
              component={LendaForm}
            />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
function setEditMode(arg0: boolean) {
  throw new Error("Function not implemented.");
}
