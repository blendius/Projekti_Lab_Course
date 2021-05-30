import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';



export default observer( function PostimetList(){
    const {postimiStore} = useStore();
    const {deletePostimi,postimetByDate,loading}=postimiStore;
    const[target,setTarget]= useState('');

    function handlePostimiDelete(e: SyntheticEvent<HTMLButtonElement>,id:string){
        setTarget(e.currentTarget.name);
        deletePostimi(id);

    }
    
    return(
        <Segment >
            <Item.Group divided>
                {postimetByDate.map(postimet=> (
                    <Item key={postimet.id}>
                        <Item.Content>
                            <Item.Header as="a">{postimet.titulli}</Item.Header>
                            <Item.Meta>{postimet.data}</Item.Meta>
                            <Item.Description>
                                <div>{postimet.permbajtja}</div> 
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/postimet/${postimet.id}`} floated='right' content='View' color='blue'/>
                                <Button  
                                name={postimet.id}
                                loading={loading && target === postimet.id} 
                                onClick={(e) => handlePostimiDelete(e,postimet.id)} 
                                floated='right' 
                                content='Delete' color='red'/>
                                <Label basic content={postimet.titulli}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )

})