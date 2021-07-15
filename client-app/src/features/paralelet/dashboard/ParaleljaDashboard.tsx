import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Container, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ParaleljaDetails from "../details/ParaleljaDetails";
import ParaleljaForm from "../form/ParaleljaForm";
import ParaleljaList from "./ParaleljaList";

export default observer(function ParaleljaDashboard() {
    const { paraleljaStore } = useStore();
    const { selectedParalelja, editMode, openForm } = paraleljaStore;

    useEffect(() => {
        paraleljaStore.loadParalelet();

    }, [paraleljaStore])

    if (paraleljaStore.loadingInitial) return <LoadingComponent content='Paralelet duke u ngarkuar...' />

    return (
        <Grid>
            <Grid.Column width='8' >
                <ParaleljaList />
            </Grid.Column>
            <Grid.Column width='4'>
                <Container>
                    <Button onClick={() => openForm()} color='green' content='Shto Paralele' size='big' ></Button>
                </Container>
                {selectedParalelja && !editMode &&
                    <ParaleljaDetails
                    />}
                {editMode &&
                    <ParaleljaForm />}
            </Grid.Column>
        </Grid>
    )
})