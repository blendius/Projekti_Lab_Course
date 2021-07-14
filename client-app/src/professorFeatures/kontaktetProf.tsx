import { Fragment, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { useStore } from '../app/stores/store';
import KontaktiProfDashboard from './Kontaktet/dashboard/KontaktiProfDashboard';
// import KontaktiDashboardProf from '../Kontaktet/dashboard/KontaktiDashboardProf';

function ShowKontaktetProf() {

  const { kontaktiStore, profesoriStore, prindiStore } = useStore();
  const { prof } = profesoriStore;

  useEffect(() => {
    kontaktiStore.loadKontaktetProf(prof?.id);
    prindiStore.loadPrinderit();
  }, [kontaktiStore, prof?.id, prindiStore])

  return (
    <Fragment>
      <div>

        <KontaktiProfDashboard/>
      </div>


    </Fragment>
  )
}
export default observer(ShowKontaktetProf);