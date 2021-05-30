//import react from 'react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import PostimetList from './PostimetList';


export default observer (function PostimetDashboard() {
    const {postimiStore} =useStore();

    useEffect(() => {
      postimiStore.loadPostimet();
      
    }, [postimiStore])
  
    if (postimiStore.loadingInitial) return <LoadingComponent content='Loading app' />
  
    return (
        <Grid>
            <Grid.Column width='10'>
                <PostimetList/>
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Filter</h2>
            </Grid.Column>
        </Grid>
    )
})