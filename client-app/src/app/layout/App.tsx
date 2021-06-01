import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import ShowProfessors from "../../features/profesoret/profesoret";
import NavBar from "./NavBar";
import TerminetDashboard from "../../features/terminet/dashboard/TerminetDashboard";
import PostimetDashboard from "../../features/postimet/dashboard/PostimetDashboard";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router";
import PostimiForm from "../../features/postimet/form/PostimiForm";
import LendetDashboard from "../../features/lendet/dashboard/LendetDashboard";
import LendaForm from "../../features/lendet/form/LendaForm";
import PostimetDetails from "../../features/postimet/details/PostimetDetails";
import LendetDetails from "../../features/lendet/details/LendetDetails";
import HomePage from "../../features/home/homePage";
import ShowPrinderit from "../../features/prinderit/showPrindi";


function App() {
  const location = useLocation();

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path="/" component={HomePage} />
        <Route path="/profesoret" component={ShowProfessors} />
        <Route path="/terminet" component={TerminetDashboard} />
        <Route exact path="/postimet" component={PostimetDashboard} />
        <Route path="/postimet/:id" component={PostimetDetails} />
        <Route path="/prinderit" component={ShowPrinderit} />
        <Route
          key={location.key}
          path={["/krijoPostime", "/managePostimi/:id"]}
          component={PostimiForm}
        />

        <Route exact path="/lendet" component={LendetDashboard} />
        <Route path="/lendet/:id" component={LendetDetails} />
        <Route
          path={["/krijoLende", "/manageLenda/:id"]}
          component={LendaForm}
        />
      </Container>
    </Fragment>
  );
}

export default observer(App);
