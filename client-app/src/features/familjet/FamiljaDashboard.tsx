import { observer } from "mobx-react-lite";
import { Button, Grid } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import FamiljaDetails from "./FamiljaDetails";
import FamiljaForm from "./FamiljaForm";
import FamiljaList from "./FamiljaList";

export default observer( function FamiljaDashboard() {
    const { familjaStore } = useStore();
    const { selectedFamilja, editMode } = familjaStore;
    return (
        <Grid>
            <Grid.Column width='8'>
                <FamiljaList />
            </Grid.Column>
            <Grid.Column width='2'></Grid.Column>
            <Grid.Column width='5'>
            <Button onClick={() => familjaStore.openForm()} positive content="Shto Familje" />
                {selectedFamilja && !editMode &&
                    <FamiljaDetails />}
                {editMode &&
                    <FamiljaForm />}
            </Grid.Column>
        </Grid>
    )
})