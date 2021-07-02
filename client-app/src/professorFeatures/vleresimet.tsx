import React, { Fragment, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../app/stores/store';
import LoadingComponent from '../app/layout/LoadingComponent';
import VleresimiDashboard from './Vleresimet/VleresimiDashboard';


function ShowVlersimet() {

  const { vleresimiStore, profesoriStore, nxenesiStore } = useStore();



  useEffect(() => {
    vleresimiStore.loadVleresimet();
  }, [vleresimiStore])



  // console.log(profesoriStore.loadProfesoret());
  // const [profMode, setProfMode] = useState(false);
  // function handleSetProfMode() {
  //   setProfMode(true)

  // }
  //if (vleresimiStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <Fragment>
      <div>
        {/* {
           profMode && */}
        <VleresimiDashboard
        />
      </div>


    </Fragment>
  )
}
export default observer(ShowVlersimet);