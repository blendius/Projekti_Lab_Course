import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default function ProfProfileList() {

    const { profesoriStore: { prof } } = useStore();


    return (
        <>
            <Grid.Row>
                <Grid.Column width={4}>
                    <img src="/assets/user.png" alt="logo" />
                </Grid.Column>
                <Grid.Column width={2}></Grid.Column>
                <Grid.Column width={10}>
                    <Grid.Row >
                        <h2>{prof?.name} </h2>
                    </Grid.Row>

                    <Grid.Row>
                        <p className='profileData'> Username:{prof?.userName}     </p>
                    </Grid.Row>
                    <Grid.Row>
                        <p className='profileData'> Email:{prof?.email}     </p>
                    </Grid.Row>

                    <Grid.Row>
                        <p className='profileData'> Grada Akademike:{prof?.gradaAkademike}</p>
                    </Grid.Row>

                    <Grid.Row>
                        <p className='profileData'>Data e regjistrimit: {prof?.dataRegjistrimit} </p>
                    </Grid.Row>

                </Grid.Column>

            </Grid.Row>
        </>
    )
}