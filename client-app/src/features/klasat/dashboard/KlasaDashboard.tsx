import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Container, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import KlasaDetails from "../details/KlasaDetails";
import KlasaForm from "../form/KlasaForm";
import KlasaList from "./KlasaList";

export default observer(function KlasaDashboard() {
    const { klasaStore, sallaStore, paraleljaStore } = useStore();
    const { selectedKlasa, editMode, openForm } = klasaStore;

    useEffect(() => {
        klasaStore.loadKlasat();

    }, [klasaStore])

    useEffect(()=>{
        sallaStore.loadSallat();
        paraleljaStore.loadParalelet();
    },[paraleljaStore, sallaStore])

    if (klasaStore.loadingInitial) return <LoadingComponent content='Klasat duke u ngarkuar...' />

    return (
        <Grid>
            <Grid.Column width='8' >
                <KlasaList />
            </Grid.Column>
            <Grid.Column width='2'></Grid.Column>
            <Grid.Column width='4'>
                <Container>
                    <Button onClick={() => openForm()} color='green' content='Shto Klasë' size='big' ></Button>
                </Container>
                {selectedKlasa && !editMode &&
                    <KlasaDetails
                    />}
                {editMode &&
                    <KlasaForm />}
            </Grid.Column>
        </Grid>
    )
})