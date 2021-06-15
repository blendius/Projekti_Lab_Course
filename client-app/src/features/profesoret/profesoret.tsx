import React, { Fragment, useEffect } from 'react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import ProfesoriDashboard from './dashboard/ProfesoriDashboard';


 function ShowProfessors() {

  const{profesoriStore,commonStore}=useStore();

    

 

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