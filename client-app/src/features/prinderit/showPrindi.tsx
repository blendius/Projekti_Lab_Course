import { Fragment, useEffect } from 'react';
import NavBar from '../NavBar';
import { Container } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import PrindiDashboard from './dashboard/PrindiDashboard';

function ShowPrinderit() {
  const {prindiStore, vleresimiStore, prindStoreAccount:{prindi}} = useStore();
  useEffect(() => {
    vleresimiStore.loadNxenesiByPrindi(prindi?.id);
    // var femija1 = vleresimiStore.loadVleresimetByNxenesi(vleresimiStore.familjaRegistry[0]?.nxenesiId);
}, [vleresimiStore])
  
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
