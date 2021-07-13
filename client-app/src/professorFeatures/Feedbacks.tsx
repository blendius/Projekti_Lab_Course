import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect } from 'react';
import LoadingComponent from '../app/layout/LoadingComponent';
import { useStore } from '../app/stores/store';
import FeedbackDashboard from './dashboard/FeedbackDashboard';


function ShowFeedbacks() {
    const { feedbackStore, profesoriStore } = useStore();
    const { prof } = profesoriStore;


    useEffect(() => {
        
        feedbackStore.loadFeedbacksProf(prof?.id);
    }, [feedbackStore, prof?.id])

    if (feedbackStore.loadingInitial) return <LoadingComponent content='Loading Data...' />

    return (
        <Fragment>
            <div>
                <FeedbackDashboard />
            </div>
        </Fragment>
    )
}
export default observer(ShowFeedbacks);