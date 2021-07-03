import React, { Fragment, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../app/stores/store';
import LoadingComponent from '../app/layout/LoadingComponent';
import VleresimiDashboard from './Vleresimet/dashboard/VleresimiDashboard';


function ShowVlersimet() {

  const { vleresimiStore, paraleljaStore, klasaStore , profesoriStore, nxenesiStore} = useStore();



  useEffect(() => {
    vleresimiStore.loadVleresimet(profesoriStore.prof?.id);
  }, [vleresimiStore])

  useEffect(() => {
    klasaStore.loadKlasat();
    paraleljaStore.loadParalelet();
    nxenesiStore.loadNxenesit();
}, [klasaStore, paraleljaStore, nxenesiStore])


  return (
    <Fragment>

        <VleresimiDashboard
        />
 
    </Fragment>
  )
}
export default observer(ShowVlersimet);