import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import HomePage from '../../features/home/homePage';
import LendetDashboard from '../../features/lendet/dashboard/LendetDashboard';
import LendetDetails from '../../features/lendet/details/LendetDetails';
import LendaForm from '../../features/lendet/form/LendaForm';
import NxenesiDashboard from '../../features/nxenesit/dashboard/NxenesiDashboard';
import Paneli from '../../features/paneli/Paneli';
import PostimetDashboard from '../../features/postimet/dashboard/PostimetDashboard';
import PostimetDetails from '../../features/postimet/details/PostimetDetails';
import ShowPrinderit from '../../features/prinderit/showPrindi';
import ShowProfessors from '../../features/profesoret/profesoret';
import TerminetDashboard from "../../features/terminet/dashboard/TerminetDashboard";
import LoginForm from "../../features/users/LoginForm";
import ModalContainer from "../common/modals/ModalContainer";
import { Nxenesi } from "../models/nxenesi";
import NavBar from "./NavBar";




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
    <>

      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route path="/Profili" component={NxenesiDashboard} />

                <Route path="/profesoret" component={ShowProfessors} />
                <Route path="/terminet" component={TerminetDashboard} />
                <Route exact path="/postimet" component={PostimetDashboard} />
                <Route path="/postimet/:id" component={PostimetDetails} />
                <Route path="/prinderit" component={ShowPrinderit} />
                <Route exact path="/lendet" component={LendetDashboard} />
                <Route path="/lendet/:id" component={LendetDetails} />
                <Route path='/login' component={LoginForm} />
                <Route
                  path={["/krijoLende", "/manageLenda/:id"]}
                  component={LendaForm} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;