import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function SallaDetails() {
    const { sallaStore } = useStore();
    const { selectedSalla: salla, loadSalla, loadingInitial, cancelSelectedSalla, openForm } = sallaStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadSalla(id);
    }, [id, loadSalla]);

    if (loadingInitial || !salla) return <LoadingComponent />;
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>Emri i sallës: {salla.emriSalles}</Card.Header>                
                <Card.Description>Kati: {salla.kati}</Card.Description>                
                <Card.Description>Numri i ulëseve: {salla.nrUleseve}</Card.Description>                
                <Card.Description>A ka projektor?: {salla.hasProjector}</Card.Description>                
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(salla.sallaId)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedSalla} basic color='red' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})