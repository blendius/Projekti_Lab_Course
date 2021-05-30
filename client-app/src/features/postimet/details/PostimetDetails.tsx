//import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';



export default function PostimetDetails() {
    const{postimiStore} = useStore();
    const {selectedPostimi:postimi,openForm,cancelSelectedPostimi}=postimiStore;

    if(!postimi) return <LoadingComponent/>;
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/food.jpg`} />
            <Card.Content>
                <Card.Header>{postimi.titulli}</Card.Header>
                <Card.Meta>
                    <span>{postimi.data}</span>
                </Card.Meta>
                <Card.Description>
                    {postimi.permbajtja}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(postimi.id)}basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedPostimi} basic color='red' content='Cancel' />
                </Button.Group>

            </Card.Content>
        </Card>
    )
}