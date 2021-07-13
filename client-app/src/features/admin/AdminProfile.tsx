import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

export default function AdminProfile() {

    const { adminStore: { user } } = useStore();


    return (
        <>
            <Grid.Row>
                <Grid.Column width={4}>
                    <img src="/assets/user.png" alt="logo" />
                </Grid.Column>
                <Grid.Column width={2}></Grid.Column>
                <Grid.Column width={10}>
                    <Grid.Row >
                        <h2>{user?.displayName} </h2>
                    </Grid.Row>

                    <Grid.Row>
                        <p className='profileData'> Username:{user?.username}     </p>
                    </Grid.Row>
                    <Grid.Row>
                        <p className='profileData'> Email:{user?.email}     </p>
                    </Grid.Row>
                  

                </Grid.Column>

            </Grid.Row>
        </>
    )
}