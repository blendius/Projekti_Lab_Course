import axios from "axios";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import {
  Route,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";

import HomePage from "../../features/home/homePage";
import LendetDashboard from "../../features/lendet/dashboard/LendetDashboard";
import LendetDetails from "../../features/lendet/details/LendetDetails";
import LendaForm from "../../features/lendet/form/LendaForm";
import NxenesiDashboard from "../../features/nxenesit/dashboard/NxenesiDashboard";
import PostimetDashboard from "../../features/postimet/dashboard/PostimetDashboard";
import PostimetDetails from "../../features/postimet/details/PostimetDetails";
import LoginFormPrindi from "../../features/prinderit/form/LoginFormPrindi";
import ShowPrinderit from "../../features/prinderit/showPrindi";
import ShowProfessors from "../../features/profesoret/profesoret";
import TerminetDashboard from "../../features/terminet/dashboard/TerminetDashboard";
import LoginForm from "../../features/users/LoginForm";
import ModalContainer from "../common/modals/ModalContainer";
import { Nxenesi } from "../models/nxenesi";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";

function App() {
  const [nxenesit, setNxenesit] = useState<Nxenesi[]>([]);
  const [editMode, setEditMode] = useState(false);
  const { commonStore, adminStore } = useStore();


  // useEffect(() => {
  //   if (commonStore.token) {
  //     adminStore.getUser().finally(() => commonStore.setAppLoaded())
  //   } else {
  //     commonStore.setAppLoaded();
  //   }

  // }, [commonStore, adminStore])

  commonStore.setAppLoaded();

  // useEffect(() => {
  //   axios
  //     .get<Nxenesi[]>("http://localhost:5000/api/Nxenesi")
  //     .then((response) => {
  //       setNxenesit(response.data);
  //     });
  // }, []);
  
  if (!commonStore.appLoaded) return <LoadingComponent content='Loading...' />

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer/>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
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
                <Route path="/login" component={LoginForm} />
                <Route path="/loginPrindi" component={LoginFormPrindi}  />
                <Route
                  path={["/krijoLende", "/manageLenda/:id"]}
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
