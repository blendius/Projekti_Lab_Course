import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function Klasa() {
    const { klasaStore, sallaStore, paraleljaStore } = useStore();
    const { selectedKlasa: klasa, loadKlasa, loadingInitial, cancelSelectedKlasa, openForm } = klasaStore;
    const { id } = useParams<{ id: string }>();
    const{getEmriSallesById} = sallaStore;
    const{getNumriParalelesById} = paraleljaStore;

    useEffect(()=>{
        sallaStore.loadSallat();
        paraleljaStore.loadParalelet();
    },[paraleljaStore, sallaStore])

    useEffect(() => {
        if (id) loadKlasa(id);
    }, [id, loadKlasa]);

    if (loadingInitial || !klasa) return <LoadingComponent />;
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>Klasa: {klasa.viti}/{getNumriParalelesById(klasa.paraleljaId)}</Card.Header>  
                <Card.Description>Salla: {getEmriSallesById(klasa.sallaId)}</Card.Description>              
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(klasa.klasaId)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedKlasa} basic color='red' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})