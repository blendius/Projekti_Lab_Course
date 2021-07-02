import React from "react";
import { Button, ButtonGroup, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";


export default function NjoftimiDetails() {
    const {njoftimiStore} = useStore();
    const {selectedNjoftimi: njoftimi, openForm, cancelSelectedNjoftimi} = njoftimiStore;
    
    if(!njoftimi) return <LoadingComponent/>;
    
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{njoftimi.titulli}</Card.Header>
                <Card.Description>
                    <div><label>Pershkrimi: </label>{njoftimi.pershkrimi}</div>
                </Card.Description>
                <Card.Meta>
                    <span>Data: {njoftimi.dataEShtimit}</span>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths='2'>
                    <Button onClick={() => openForm(njoftimi.njoftimiId)}basic color='blue' content='Edito'/>
                    <Button onClick={cancelSelectedNjoftimi} basic color='grey' content='Anulo'/>
                </ButtonGroup>
            </Card.Content>
        </Card>

    )
}