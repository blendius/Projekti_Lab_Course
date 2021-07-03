import React from "react";
import { Button, ButtonGroup, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";


export default function AktivitetetDetails() {
    const { autobusiStore } = useStore();
    const { selectedAutobusi: autobusi, openForm, cancelSelectedAutobusi } = autobusiStore;

    if (!autobusi) return <LoadingComponent />;

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{autobusi.brendi}</Card.Header>
                <Card.Description>
                    <div><label>Targat: </label>{autobusi.targatId}</div>
                </Card.Description>
                <Card.Meta>
                    <span>Data: {autobusi.vitiProdhimit}</span>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths='2'>
                    <Button onClick={() => openForm(autobusi.AutobusiId)} basic color='blue' content='Edito' />
                    <Button onClick={cancelSelectedAutobusi} basic color='grey' content='Anulo' />
                </ButtonGroup>
            </Card.Content>
        </Card>

    )
}