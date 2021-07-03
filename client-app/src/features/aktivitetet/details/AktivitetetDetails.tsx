import React from "react";
import { Button, ButtonGroup, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";


export default function AktivitetetDetails() {
    const { aktivitetiStore } = useStore();
    const { selectedAktiviteti: aktiviteti, openForm, cancelSelectedAktiviteti } = aktivitetiStore;

    if (!aktiviteti) return <LoadingComponent />;

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{aktiviteti.Emri}</Card.Header>
                <Card.Description>
                    <div><label>Pershkrimi: </label>{aktiviteti.Pershkrimi}</div>
                </Card.Description>
                <Card.Meta>
                    <span>Data: {aktiviteti.DataMbajtjes}</span>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths='2'>
                    <Button onClick={() => openForm(aktiviteti.AktivitetiId)} basic color='blue' content='Edito' />
                    <Button onClick={cancelSelectedAktiviteti} basic color='grey' content='Anulo' />
                </ButtonGroup>
            </Card.Content>
        </Card>

    )
}