import React, { Fragment, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { useStore } from '../app/stores/store';
import LoadingComponent from '../app/layout/LoadingComponent';
import KontaktiDashboard from './dashboard/KontaktiDashboard';


function ShowKontaktet() {

  const { kontaktiStore, prindStoreAccount, profesoriStore } = useStore();
  const { prindi } = prindStoreAccount;



  useEffect(() => {
    kontaktiStore.loadKontaktetPrindi(prindi?.id);
    profesoriStore.loadProfesoret();
  }, [kontaktiStore, prindi?.id, profesoriStore])

  if (kontaktiStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <Fragment>
      <div>

        <KontaktiDashboard
        />
      </div>


    </Fragment>
  )
}
export default observer(ShowKontaktet);