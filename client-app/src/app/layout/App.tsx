import axios from "axios";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";

import HomePage from "../../features/home/homePage";
import Dashboard from "../../features/nxenesiFromAdmin/dashboard/Dashboard";
import LendetDashboard from "../../features/lendet/dashboard/LendetDashboard";
import LendetDetails from "../../features/lendet/details/LendetDetails";
import LendaForm from "../../features/lendet/form/LendaForm";
import NxenesiDashboard from "../../features/nxenesit/dashboard/NxenesiDashboard";
import Paneli from "../../features/paneli/Paneli";
import PostimetDashboard from "../../features/postimet/dashboard/PostimetDashboard";
import PostimetDetails from "../../features/postimet/details/PostimetDetails";
import LoginFormPrindi from "../../features/prinderit/form/LoginFormPrindi";
import ShowPrinderit from "../../features/prinderit/showPrindi";
import LoginFormProf from "../../features/profesoret/form/LoginFormProf";
import ShowProfessors from "../../features/profesoret/profesoret";
import ShowLaburatoret from "../../features/laburatori/laburatoret";
import ProfProfileDashboard from "../../features/profesoret/profProfile/ProfProfileDashboard";
import LoginForm from "../../features/users/LoginForm";
import ProfessorPage from "../../professorFeatures/ProfessorPage";
import ModalContainer from "../common/modals/ModalContainer";
import { Nxenesi } from "../models/nxenesi";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import NavBar from "../../features/NavBar";
import adminPage from "../../features/adminPage";
import NavBarProf from "../../professorFeatures/NavBarProf";
import PrindiPage from "../../prindiFeatures/PrindiPage";
import NavBarPrindi from "../../prindiFeatures/NavBarPrindi";
import ShowKontaktet from "../../prindiFeatures/kontaktet";
import kontaktetProf from "../../professorFeatures/kontaktetProf";
import PrindProfileDashboard from "../../features/prinderit/prindProfile/PrindProfileDashboard";
import kontaktet from "../../prindiFeatures/kontaktet";
import NavBarNxenesi from "../../nxenesiFeatures/NavBarNxenesi";
import NxenesiPage from "../../nxenesiFeatures/NxenesiPage";
import OraretDashboard from "../../features/oraret/dashboard/OraretDashboard";
import PajisjetDashboard from "../../features/pajisjet/dashboard/PajisjetDashboard";

function App() {
  const [nxenesit, setNxenesit] = useState<Nxenesi[]>([]);
  const [editMode, setEditMode] = useState(false);
  const { commonStore, adminStore, profesoriStore } = useStore();

  // useEffect(() => {
  //   if (commonStore.token && nxenesiStore.isLoggedIn) {
  //     nxenesiStore.getNxenesin().finally(() => commonStore.setAppLoaded());
  //   } else {
  //     commonStore.setAppLoaded();
  //   }
  // }, [commonStore, nxenesiStore])

  // useEffect(() => {
  //   if (commonStore.token) {
  //     profesoriStore.getProf().finally(() => commonStore.setAppLoaded())
  //   } else {
  //     commonStore.setAppLoaded();
  //   }

  // }, [commonStore, profesoriStore])

  commonStore.setAppLoaded();

  // useEffect(() => {
  //   axios
  //     .get<Nxenesi[]>("http://localhost:5000/api/Nxenesi")
  //     .then((response) => {
  //       setNxenesit(response.data);
  //     });
  // }, []);

  if (!commonStore.appLoaded) return <LoadingComponent content="Loading..." />;

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
      <Route exact path="/" component={HomePage} />

      <Route path="/professorPage" component={ProfessorPage} />
      <Route
        path={"/professorPage/(.+)"}
        render={() => (
          <>
            <NavBarProf />

            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route
                  path="/professorPage/ProfProfili"
                  component={ProfProfileDashboard}
                />
                <Route
                  path="/professorPage/Kontaktet"
                  component={kontaktetProf}
                />
              </Switch>
            </Container>
          </>
        )}
      />

      <Route path="/professorPage" component={ProfessorPage} />
      <Route
        path={"/professorPage/(.+)"}
        render={() => (
          <>
            <NavBarProf />

            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route
                  path="/professorPage/ProfProfili"
                  component={ProfProfileDashboard}
                />
              </Switch>
            </Container>
          </>
        )}
      />

      <Route path="/prindiPage" component={PrindiPage} />
      <Route
        path={"/prindiPage/(.+)"}
        render={() => (
          <>
            <NavBarPrindi />

            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route
                  path="/prindiPage/PrindProfili"
                  component={PrindProfileDashboard}
                />
                <Route path="/prindiPage/Kontaktet" component={kontaktet} />
              </Switch>
            </Container>
          </>
        )}
      />

      <Container style={{ marginTop: "7em" }}>
        <Switch></Switch>
      </Container>

      <Route path="/nxenesiPage" component={NxenesiPage} />
      <Route
        path={"/nxenesiPage/(.+)"}
        render={() => (
          <>
            <NavBarNxenesi />

            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route
                  exact
                  path="/nxenesiPage/Profili/"
                  component={NxenesiDashboard}
                />
              </Switch>
            </Container>
          </>
        )}
      />

      <Route path="/adminPage" component={adminPage} />
      <Route
        path={"/adminPage/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route path="/adminPage/paneli" component={Paneli} />
                <Route
                  exact
                  path="/adminPage/Profili"
                  component={NxenesiDashboard}
                />
                <Route
                  path="/adminPage/profesoret"
                  component={ShowProfessors}
                />
                <Route path="/adminPage/oraret" component={OraretDashboard} />
                <Route
                  exact
                  path="/adminPage/postimet"
                  component={PostimetDashboard}
                />
                <Route
                  path="/adminPage/postimet/:id"
                  component={PostimetDetails}
                />
                <Route path="/adminPage/nxenesit" component={Dashboard} />
                <Route path="/adminPage/prinderit" component={ShowPrinderit} />
                <Route
                  exact
                  path="/adminPage/lendet"
                  component={LendetDashboard}
                />
                <Route path="/adminPage/lendet/:id" component={LendetDetails} />

                <Route path="/adminPage/login" component={LoginForm} />
                <Route path="/adminPage/loginProf" component={LoginFormProf} />
                <Route
                  path="/adminPage/loginPrindi"
                  component={LoginFormPrindi}
                />
                <Route
                  path="/adminPage/laburatoret"
                  component={ShowLaburatoret}
                />
                <Route
                  path="/adminPage/pajisjet"
                  component={PajisjetDashboard}
                />
                <Route
                  path={["/adminPage/krijoLende", "/adminPage/manageLenda/:id"]}
                  component={LendaForm}
                />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
