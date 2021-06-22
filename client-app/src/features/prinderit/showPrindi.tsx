import { Fragment, useEffect } from 'react';
import NavBar from '../../app/layout/NavBar';
import { Container } from 'semantic-ui-react';
import PrindiDashboard from './dashboard/PrindiDashboard';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';

function ShowPrinderit() {
  const {prindiStore} = useStore();
  
  useEffect(() => {
   prindiStore.loadPrinderit();
  }, [prindiStore])

  if (prindiStore.loadingInitial) return <LoadingComponent inverted={false} content='Loading app' />

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <PrindiDashboard />
      </Container>
    </Fragment>
  );
}

export default observer(ShowPrinderit);
