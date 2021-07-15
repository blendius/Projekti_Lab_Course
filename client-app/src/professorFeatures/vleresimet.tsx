import { Fragment, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../app/stores/store';
import VleresimiDashboard from './Vleresimet/dashboard/VleresimiDashboard';


function ShowVlersimet() {

  const { vleresimiStore, paraleljaStore, klasaStore , profesoriStore,prindStoreAccount:{prindi}, nxenesiStore} = useStore();

 

  useEffect(() => {
    vleresimiStore.loadVleresimet(profesoriStore.prof?.id);
  }, [vleresimiStore, profesoriStore.prof?.id])

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