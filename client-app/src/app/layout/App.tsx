import { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import PostimetDashboard from '../../features/postimet/dashboard/PostimetDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {

  const { postimiStore } = useStore();

  useEffect(() => {
    postimiStore.loadPostimet();
  }, [postimiStore])

  if (postimiStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <PostimetDashboard />
      </Container>

    </Fragment>
  );
}

export default observer(App);
