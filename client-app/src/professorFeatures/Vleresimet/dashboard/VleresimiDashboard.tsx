import { observer } from 'mobx-react-lite';
import { Grid, List } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import VleresimiDetails from './VleresimiDetails';
import VlersimiForm from '../forms/VlersimiForm';
import VlersimiList from './VlersimiList';
import SelectKlasaForm from '../forms/SelectKlasaForm';
import NxenesiByKlasa from './NxenesiByKlasa';




export default observer(function VleresimiDashboard() {
    const { vleresimiStore } = useStore();
    const { selectedVlersimi, editMode, nxensiMode } = vleresimiStore
    console.log(nxensiMode);
    return (
        <Grid relaxed>
            <Grid.Row >
                <Grid.Column width='4'>
                    <List.Header as='a'>Zgjedhni klasen qe done te vleresoni: </List.Header>

                    <SelectKlasaForm />


                </Grid.Column>
                <Grid.Column width='2'></Grid.Column>
                <Grid.Column width='6'>


                    {nxensiMode &&
                        <>
                            <List.Header as='a'> Nxenesit e klases: </List.Header>
                            <NxenesiByKlasa />
                        </>
                    }
                </Grid.Column>

                <Grid.Column width='4' >


                    {editMode && <>
                        <List.Header as='a'>Vendos vleresimin: </List.Header>
                        <VlersimiForm /> </>}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row fixed>

                <Grid.Column width='5'>
                    <hr></hr>
                    <List.Header as='a'>Vleresimet e bera nga ju: </List.Header>
                    <VlersimiList />
                </Grid.Column>

                <Grid.Column width='11'>

                    {selectedVlersimi &&
                        <>
                            <hr></hr>
                            <List.Header as='a'>Detajet: </List.Header>

                            <VleresimiDetails />
                        </>}

                </Grid.Column>
            </Grid.Row>

        </Grid>
    )
})