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
import ShowPrinderit from "../../features/prinderit/showPrindi";
import LoginFormProf from "../../features/profesoret/form/LoginFormProf";
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
  const { commonStore, adminStore , profesoriStore } = useStore();

  
  useEffect(() => {
    if (commonStore.token) {
      adminStore.getUser().finally(() => commonStore.setAppLoaded())
      profesoriStore.getProf().finally(() => commonStore.setAppLoaded())
    }  else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, adminStore, profesoriStore])

  // useEffect(() => {
  //   if (commonStore.token) {
  //     profesoriStore.getProf().finally(() => commonStore.setAppLoaded())
  //   } else {
  //     commonStore.setAppLoaded();
  //   }

  // }, [commonStore, profesoriStore])



  useEffect(() => {
    axios
      .get<Nxenesi[]>("http://localhost:5000/api/Nxenesi")
      .then((response) => {
        setNxenesit(response.data);
        console.log(response);
      });
  }, []);
  
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
                <Route path="/loginProf" component={LoginFormProf} />
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
