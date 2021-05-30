//import react from 'react';
import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import PostimetDetails from '../details/PostimetDetails';
import PostimiForm from '../form/PostimiForm';
import PostimetList from './PostimetList';


export default observer (function PostimetDashboard() {
    const {postimiStore} =useStore();
    const{selectedPostimi,editMode} =postimiStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <PostimetList/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedPostimi && !editMode &&
                    <PostimetDetails
                    />}
                {editMode &&
                    <PostimiForm
                    />}
            </Grid.Column>
        </Grid>
    )
})