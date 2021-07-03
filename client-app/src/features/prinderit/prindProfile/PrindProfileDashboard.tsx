import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import PrindModal from './PrindModal';
import PrindProfileList from './PrindProfileList';

export default observer(function PrindProfileDashboard() {
    const { prindStoreAccount } = useStore();

    const [open, setOpen] = React.useState(false)
    const Prindi = prindStoreAccount.prindi;
    return (
        <>
            <Segment>
                <Grid>
                    <PrindProfileList />
                </Grid>
                <Button primary onClick={() => setOpen(true)}>Edit</Button>
            </Segment>
            <PrindModal open={open} setOpen={setOpen} />
        </>
    )
})