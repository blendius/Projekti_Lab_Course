import axios from 'axios';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Card, Icon, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Nxenesi } from '../../app/models/nxenesi';
import { useStore } from '../../app/stores/store';
import './style.css';

export default observer(function Paneli() {

    const { lendaStore, profesoriStore, nxenesiStore } = useStore();
    const { lendetCount } = lendaStore;
    const { profesoriCount } = profesoriStore;
    const { nxenesitCount } = nxenesiStore;

    var countNxenesit = 0;
    useEffect(() => {

        lendaStore.loadLendet();
        profesoriStore.loadProfesoret();
        nxenesiStore.loadNxenesit();


    }, [lendaStore, profesoriStore, nxenesiStore])

    // console.log(lendaStore.loadingInitial)
    if (lendaStore.loadingInitial) return <LoadingComponent content='Lendet duke u Ngarkuar...' />
    if (profesoriStore.loadingInitial) return <LoadingComponent content='Profesori duke u Ngarkuar...' />


    return (
        <Segment>
            <Card.Group itemsPerRow={4}>
                <Card className="StatsCard" color='red' >
                    <div className="iconDiv">
                        <Icon name='book' size='huge' className="icon" />
                    </div>
                    <h2 className="title" >Te Gjitha Lendet</h2>
                    <h2 className="count">{lendetCount}</h2>
                </Card>
                <Card className="StatsCard" color='red' >
                    <div>
                        <Icon name='user' size='huge' className="icon" />
                    </div>
                    <h2 className="title">Te Gjitha Profesoret</h2>
                    <h2 className="count">{profesoriCount}</h2>
                </Card>
                <Card className="StatsCard" color='red' >
                    <div>
                        <Icon name='student' size='huge' className="icon" />
                    </div>
                    <h2 className="title">Te Gjitha Nxenesit</h2>
                    <h2 className="count">{nxenesitCount}</h2>
                </Card>
            </Card.Group>

        </Segment>
    )

})