import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import NxenesiDashboard from "../../features/nxenesit/dashboard/NxenesiDashboard";
import HomePage from "../../features/home/homePage";
import TerminetDashboard from "../../features/terminet/dashboard/TerminetDashboard";
import PostimetDashboard from "../../features/postimet/dashboard/PostimetDashboard";
import PostimetDetails from "../../features/postimet/details/PostimetDetails";
import ShowPrinderit from "../../features/prinderit/showPrindi";
import ShowProfessors from "../../features/profesoret/profesoret";
import LendetDashboard from "../../features/lendet/dashboard/LendetDashboard";
import LendetDetails from "../../features/lendet/details/LendetDetails";
import LendaForm from "../../features/lendet/form/LendaForm";
import Dashboard from "../../features/nxenesiFromAdmin/dashboard/Dashboard";
import NxenesiDetails from "../../features/nxenesiFromAdmin/details/NxenesiDetails";

function App() {
  
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
            <Route exact path='/nxenesit' component={Dashboard}/>
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

export default observer(App);

