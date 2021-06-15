import React, { useEffect } from 'react';
import { Card, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

export default function Paneli() {

    const { commonStore, adminStore,  } = useStore();
    useEffect(() => {
        if (commonStore.token) {
            adminStore.getUser().finally(() => commonStore.setAppLoaded())
        } 
    }, [commonStore, adminStore])

    return (
        <Segment>
            <Card.Group itemsPerRow={4}>
                <Card color='red' >
                    <h2 >Nr Nxenesave</h2>
                </Card>
            </Card.Group>

        </Segment>
    )

}