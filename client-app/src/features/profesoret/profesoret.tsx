import React, { Fragment, useEffect } from 'react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import ProfesoriDashboard from './dashboard/ProfesoriDashboard';
import ProfesoriStore from '../../app/stores/profesoriStore';


 function ShowProfessors() {

  const{profesoriStore,klasaStore,lendaStore}=useStore();


  useEffect(() => {
    profesoriStore.loadProfesoret();
    lendaStore.loadLendet();
    klasaStore.loadKlasat();
    profesoriStore.loadProfesoriKlaset(profesoriStore.selectedProfessor?.id);
  }, [profesoriStore]) 


  if (profesoriStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <Fragment>
      <div>
          <ProfesoriDashboard 
          />
      </div>

     
    </Fragment>
  )
}
export default observer(ShowProfessors);