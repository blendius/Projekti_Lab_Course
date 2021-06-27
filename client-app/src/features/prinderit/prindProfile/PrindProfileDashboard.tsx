import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import PrindModal from './PrindModal';
import PrindProfileList from './PrindProfileList';

export default observer(function PrindProfileDashboard() {
    const [open, setOpen] = React.useState(false)

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