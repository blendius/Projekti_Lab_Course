import { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import PostimetDashboard from '../../features/postimet/dashboard/PostimetDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import PostimiForm from '../../features/postimet/form/PostimiForm';
import LendetDashboard from '../../features/lendet/dashboard/LendetDashboard';
import LendaForm from '../../features/lendet/form/LendaForm';
import PostimetDetails from '../../features/postimet/details/PostimetDetails';
import LendetDetails from '../../features/lendet/details/LendetDetails';


function App() {

  const location = useLocation();

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/postimet' component={PostimetDashboard}/>
        <Route path='/postimet/:id' component={PostimetDetails}/>
        <Route key={location.key} path={['/krijoPostime','/managePostimi/:id']} component={PostimiForm}/>


        <Route exact path='/lendet' component={LendetDashboard}/>
        <Route path='/lendet/:id' component={LendetDetails}/>
        <Route path={['/krijoLende','/manageLenda/:id']} component={LendaForm}/>
      </Container>

    </Fragment>
  );
}

export default observer(App);
