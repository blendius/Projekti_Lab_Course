import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../../app/layout/NavBar";
import axios from "axios";
import { Prindi } from "../../app/models/prindi";
import { v4 as uuid } from "uuid";
import { Container, List } from "semantic-ui-react";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import PrindiDashboard from "../../features/prinderit/dashboard/PrindiDashboard";
import { Route } from "react-router";
import ShowPrinderit from "../../features/prinderit/showPrindi";

function App() {
  return (
    <Fragment>
      <Container style={{ marginTop: "7em" }}>
        <Route path="/prinderit" component={ShowPrinderit} />
        
      </Container>
    </Fragment>
  );
}

export default App;
