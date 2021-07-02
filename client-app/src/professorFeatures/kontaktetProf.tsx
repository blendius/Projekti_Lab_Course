import React, { Fragment, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { useStore } from '../app/stores/store';
import LoadingComponent from '../app/layout/LoadingComponent';
import KontaktiProfDashboard from './Kontaktet/dashboard/KontaktiProfDashboard';
// import KontaktiDashboardProf from '../Kontaktet/dashboard/KontaktiDashboardProf';

 function ShowKontaktetProf() {

  const{kontaktiStore, profesoriStore}=useStore();
  const{ prof}=profesoriStore;

console.log(prof?.email);

  useEffect(() => {
    kontaktiStore.loadKontaktetProf(prof?.email);
  }, [kontaktiStore]) 

  if (kontaktiStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <Fragment>
      <div>
        
          <KontaktiProfDashboard
          />
      </div>

     
    </Fragment>
  )
}
export default observer(ShowKontaktetProf);