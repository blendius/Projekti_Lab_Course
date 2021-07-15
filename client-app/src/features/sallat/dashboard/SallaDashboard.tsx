import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Container, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import SallatDetails from "../details/SallaDetails";
import SallaForm from "../form/SallaForm";
import SallaList from "./SallaList";

export default observer(function SallaDashboard() {
    const { sallaStore } = useStore();
    const { selectedSalla, editMode, openForm } = sallaStore;

    useEffect(() => {
        sallaStore.loadSallat();

    }, [sallaStore])

    if (sallaStore.loadingInitial) return <LoadingComponent content='Sallat duke u ngarkuar...' />

    return (
        <Grid>
            <Grid.Column width='8' >
                <SallaList />
            </Grid.Column>
            <Grid.Column width='4'>
                <Container>
                    <Button onClick={() => openForm()} color='green' content='Shto Sallë' size='big' ></Button>
                </Container>
                {selectedSalla && !editMode &&
                    <SallatDetails
                    />}
                {editMode &&
                    <SallaForm />}
            </Grid.Column>
        </Grid>
    )
})