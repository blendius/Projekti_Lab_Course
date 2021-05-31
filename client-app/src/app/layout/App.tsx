  import React, { Fragment, useEffect, useState } from 'react';
  import axios from "axios";
  import { Container, Header, List } from 'semantic-ui-react';
  import { Nxenesi } from '../models/nxenesi';
  import NavBar from './NavBar';
  import NxenesiDashboard from '../../Features/nxenesit/dashboard/NxenesiDashboard';
  import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  function App() {
  const [nxenesit, setNxenesit] = useState<Nxenesi[]>([]);
  const [editMode, setEditMode] = useState(false);
  useEffect(()=>{
    axios.get<Nxenesi[]>("http://localhost:5000/api/Nxenesi").then(response =>{
      setNxenesit(response.data);
      console.log(response);
    })
  },[])


    return (
      <Router>
        <NavBar/>   
        <Container style={{marginTop: "7em"}}>
        <Switch>
            <Route path="/Profili">
                  <NxenesiDashboard />
            </Route>
            <Route path="/">
            </Route>
        </Switch>
        </Container>
      </Router>
    );
  }

  export default App;
function setEditMode(arg0: boolean) {
  throw new Error('Function not implemented.');
}

