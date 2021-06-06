//import React from 'react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';



export default observer( function PostimetDetails() {
    const { postimiStore } = useStore();
    const { selectedPostimi: postimi ,loadPostimi,loadingInitial} = postimiStore;
    const { id } = useParams<{ id: string }>();

    useEffect(()=>{
        if(id) loadPostimi(id);
    },[id,loadPostimi]);

    if (loadingInitial || !postimi) return <LoadingComponent />;
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
                    <Button as={Link} to={`/managePostimi/${postimi.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to="/postimet" basic color='red' content='Cancel' />
                </Button.Group>

            </Card.Content>
        </Card>
    )
})