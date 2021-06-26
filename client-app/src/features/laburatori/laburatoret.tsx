import React, { Fragment, useEffect, useState } from 'react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LaburatoriDashboard from './dashboard/LaburatoriDashboard';


 function ShowLaburatoret() {

  const{laburatoriStore}=useStore();

 

  useEffect(() => {
    laburatoriStore.loadLaburatoret();
  }, [laburatoriStore]) 


  if (laburatoriStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <Fragment>
      <div>
       
          <LaburatoriDashboard 
          />
      </div>

     
    </Fragment>
  )
}
export default observer(ShowLaburatoret);