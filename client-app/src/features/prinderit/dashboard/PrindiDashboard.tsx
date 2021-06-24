import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import PrindiForm from '../form/PrindiForm';
import RegisterFormPrindi from '../form/RegisterFormPrindi';
import PrindiList from './PrindiList';

export default observer(function PrindiDashboard() {

    const { prindiStore, modalStore, commonStore, prindStoreAccount } = useStore();
    const { selectedPrindi, editMode, closeForm, openForm } = prindiStore;

    useEffect(() => {
        if (commonStore.token) {
            prindStoreAccount.getPrindi().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, prindStoreAccount])


    return (
        <Grid>
            <Grid.Column width='12'>
                <PrindiList />
            </Grid.Column>

            <Grid.Column width='4'>
                <Button onClick={() => modalStore.openModal(<RegisterFormPrindi />)} size='small' >
                    Regjistro Prind!
                </Button>
                {editMode &&
                    <PrindiForm />}
            </Grid.Column>
        </Grid>
    )
})