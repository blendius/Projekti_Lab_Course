import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';



export default observer(function PostimiForm() {
    const { postimiStore } = useStore();
    const {  createPostimi, updatePostimi, loading,loadPostimi ,loadingInitial} = postimiStore;
    const { id } = useParams<{ id: string }>();
   
    const [postimi, setPostimi] = useState({
        id: '',
        titulli: '',
        permbajtja: '',
        data: ''
    });

    useEffect(()=>{
        if(id) loadPostimi(id).then(postimi => setPostimi(postimi!))
    },[id,loadPostimi]);



    function handleSubmit() {
        postimi.id ? updatePostimi(postimi) : createPostimi(postimi);
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setPostimi({ ...postimi, [name]: value })
    }
if(loadingInitial) return <LoadingComponent content='loading postimi...'/>
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Titulli' value={postimi.titulli} name='titulli' onChange={handleInputChange} />
                <Form.Input placeholder='Permbajtja' value={postimi.permbajtja} name='permbajtja' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Data' value={postimi.data} name='data' onChange={handleInputChange} />

                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button  floated='right' type='button' content='Cancel' />

            </Form>
        </Segment>
    )
})