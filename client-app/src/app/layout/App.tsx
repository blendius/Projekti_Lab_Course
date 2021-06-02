import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";
import { Nxenesi } from "../models/nxenesi";
import ShowProfessors from "../../features/profesoret/profesoret";
import NavBar from "./NavBar";
import TerminetDashboard from "../../features/terminet/dashboard/TerminetDashboard";
import PostimetDashboard from "../../features/postimet/dashboard/PostimetDashboard";
import { observer } from "mobx-react-lite";
import LendetDashboard from "../../features/lendet/dashboard/LendetDashboard";
import LendaForm from "../../features/lendet/form/LendaForm";
import PostimetDetails from "../../features/postimet/details/PostimetDetails";
import LendetDetails from "../../features/lendet/details/LendetDetails";
import HomePage from "../../features/home/homePage";
import ShowPrinderit from "../../features/prinderit/showPrindi";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NxenesiDashboard from "../../features/nxenesit/dashboard/NxenesiDashboard";
function App() {
  const [nxenesit, setNxenesit] = useState<Nxenesi[]>([]);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    axios
      .get<Nxenesi[]>("http://localhost:5000/api/Nxenesi")
      .then((response) => {
        setNxenesit(response.data);
        console.log(response);
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
