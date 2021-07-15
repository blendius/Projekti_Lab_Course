import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function ParaleljaDetails() {
    const { paraleljaStore } = useStore();
    const { selectedParalelja: paralelja, loadParalelja, loadingInitial, cancelSelectedParalelja, openForm } = paraleljaStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadParalelja(id);
    }, [id, loadParalelja]);

    if (loadingInitial || !paralelja) return <LoadingComponent />;
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>Numri: {paralelja.numri}</Card.Header>  
                <Card.Description>
                    <span>Kapaciteti Max: {paralelja.kapacitetiMax}</span>
                </Card.Description> 
                <Card.Description>
                    <span>Kapaciteti Min: {paralelja.kapacitetiMin}</span>
                </Card.Description>              
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(paralelja.paraleljaId)} basic color='blue' content='Përmiso' />
                    <Button onClick={cancelSelectedParalelja} basic color='red' content='Anulo' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})