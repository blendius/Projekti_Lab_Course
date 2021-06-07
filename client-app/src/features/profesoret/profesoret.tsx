import React, { Fragment, useEffect } from 'react';
import ProfesoriDashboard from './dashboard/ProfesoriDashboard';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';


 function ShowProfessors() {

  const{profesoriStore}=useStore();

 

  useEffect(() => {
    profesoriStore.loadProfesoret();
  }, [profesoriStore]) 

 
  // const [profMode, setProfMode] = useState(false);
  // function handleSetProfMode() {
  //   setProfMode(true)

  // }
  if (profesoriStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <Fragment>
      <div>
        {/* {
           profMode && */}
          <ProfesoriDashboard 
          />
      </div>

     
    </Fragment>
  )
}
export default observer(ShowProfessors);