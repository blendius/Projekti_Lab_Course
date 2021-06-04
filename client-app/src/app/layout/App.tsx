import react, {  useEffect, useState } from "react";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";
import { Nxenesi } from "../models/nxenesi";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NxenesiDashboard from "../../features/nxenesit/dashboard/NxenesiDashboard";
import HomePage from "../../features/home/homePage";
import TerminetDashboard from "../../features/terminet/dashboard/TerminetDashboard";
import PostimetDashboard from "../../features/postimet/dashboard/PostimetDashboard";
import PostimetDetails from "../../features/postimet/details/PostimetDetails";
import ShowPrinderit from "../../features/prinderit/showPrindi";
import ShowProfessors from "../../features/profesoret/profesoret";
import LendetDetails from "../../features/lendet/details/LendetDetails";
import LendaForm from "../../features/lendet/form/LendaForm";
import LendetDashboard from "../../features/lendet/dashboard/LendetDashboard";

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