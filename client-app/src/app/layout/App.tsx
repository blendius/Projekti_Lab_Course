import React, { Fragment, useEffect } from "react";
import { Container } from "semantic-ui-react";
import ShowProfessors from "../../features/profesoret/profesoret";
import NavBar from "./NavBar";
import { Route } from "react-router";
import HomePage from "../../features/home/homePage";
import TerminetDashboard from "../../features/terminet/dashboard/TerminetDashboard";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";

function App() {
  const { terminiStore } = useStore();
  useEffect(() => {
    terminiStore.loadTerminet();
  }, [terminiStore]);

  if (terminiStore.loadingInitial) {
    return <LoadingComponent content="Loading app" />;
  }

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
        <TerminetDashboard />

        <Route exact path="/" component={HomePage} />
        <Route path="/profesoret" component={ShowProfessors} />
      </Container>
    </Fragment>
  );
}

export default App;
