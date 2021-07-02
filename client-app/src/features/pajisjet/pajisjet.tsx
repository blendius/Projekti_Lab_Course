import React, { Fragment, useEffect, useState } from 'react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import PajisjetDashboard from './dashboard/PajisjetDashboard';



function ShowPajisjet() {

    const { pajisjetStore, laburatoriStore } = useStore();



    useEffect(() => {
        pajisjetStore.loadPajisjet();
    }, [[pajisjetStore]])

    useEffect(() => {
        laburatoriStore.loadLaburatoret();
    }, [laburatoriStore])


    if (pajisjetStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return (
        <Fragment>
            <div>

                <PajisjetDashboard
                />
            </div>


        </Fragment>
    )
}
export default observer(ShowPajisjet);