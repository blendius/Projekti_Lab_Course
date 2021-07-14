import React, { Fragment, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import LoadingComponent from '../../app/layout/LoadingComponent';
import FeedbackDashboard from './FeedbackDashboard';


function ShowFeedbacks() {

  const { feedbackStore, nxenesiStore, profesoriStore } = useStore();
  const { prof } = profesoriStore;



  useEffect(() => {
    console.log(prof?.id);
      
       feedbackStore.loadFeedbacksProf(prof?.id);
      nxenesiStore.loadNxenesit();

  }, [feedbackStore, prof?.id, nxenesiStore])

    if (feedbackStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <Fragment>
      <div>

        <FeedbackDashboard/>
      </div>


    </Fragment>
  )
}
export default observer(ShowFeedbacks);