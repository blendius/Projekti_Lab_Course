import { observer } from 'mobx-react-lite';
import { Grid, List } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import KontaktetProfDetails from '../KontaktetProfDetails';
import KontaktiProfList from '../KontaktiProfList';
import ReplyForm from '../ReplyForm';
import ReplyList from '../ReplyList';

export default observer(function KontaktiDashboard() {
    const { kontaktiStore ,modalStore} = useStore();
    const { selectedKontakti, editMode, modalMode } = kontaktiStore
    return (
        <Grid>

            <Grid.Column width='6'>
                <hr></hr>
                <List.Header as='a'>Kontaktet e pranuara: </List.Header>
                <hr></hr>
                <KontaktiProfList />
            </Grid.Column>

            <Grid.Column width='4'></Grid.Column>

            <Grid.Column width='6'>
                <hr></hr>
                <List.Header as='a'>Kontaktet e derguara nga ju: </List.Header>
                <hr></hr>
                <ReplyList />
            </Grid.Column>

            {modalMode &&
                    modalStore.openModal(<KontaktetProfDetails />)}
           
           
                {editMode &&
                  modalStore.openModal(<ReplyForm />)}
          
        </Grid>
    )
})