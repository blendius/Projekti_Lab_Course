import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';



export default observer(function PostimiForm() {
    const { postimiStore } = useStore();
    const { selectedPostimi, closeForm, createPostimi, updatePostimi, loading } = postimiStore;

    const initialState = selectedPostimi ?? {
        id: '',
        titulli: '',
        permbajtja: '',
        data: ''
    }

    const [postimi, setPostimi] = useState(initialState);

    function handleSubmit() {
        postimi.id ? updatePostimi(postimi) : createPostimi(postimi);
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setPostimi({ ...postimi, [name]: value })
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Titulli' value={postimi.titulli} name='titulli' onChange={handleInputChange} />
                <Form.Input placeholder='Permbajtja' value={postimi.permbajtja} name='permbajtja' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Data' value={postimi.data} name='data' onChange={handleInputChange} />

                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />

            </Form>
        </Segment>
    )
})