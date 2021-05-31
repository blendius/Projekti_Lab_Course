import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import ShowProfessors from "../../features/profesoret/profesoret";
import NavBar from "./NavBar";
import { Route } from "react-router";
import HomePage from "../../features/home/homePage";
import TerminetDashboard from "../../features/terminet/dashboard/TerminetDashboard";

function App() {
  {
    /*useEffect(() => {
    axios.get("http://localhost:5000/api/Postimet").then((response) => {
      setPostimet(response.data);
    });
  }, []);*/
  }

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path="/" component={HomePage} />
        <Route path="/profesoret" component={ShowProfessors} />
        <Route path="/terminet" component={TerminetDashboard} />
      </Container>
    </Fragment>
  );
}

export default App;
