import React, { Fragment, useEffect, useState } from 'react';
import NavBar from '../../app/layout/NavBar';
// import ProfesoriDashboard from './dashboard/ProfesoriDashboard';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import KlubiDashboard from '../klubet/dashboard/KlubiDashboard'

 function ShowKlubet() {

  const {klubiStore} = useStore()

  useEffect(()=>{
    klubiStore.loadKlubi();
  },[klubiStore])


  if (klubiStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <Fragment>

<KlubiDashboard/>
    </Fragment>
  )
}
export default observer(ShowKlubet);


 