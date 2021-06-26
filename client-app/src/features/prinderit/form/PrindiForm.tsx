import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button,  Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default observer(function PrindiForm() {
    const {prindiStore} = useStore();
    const {selectedPrindi, closeForm, createPrindi, updatePrindi, loading} = prindiStore;
    
    const initialState = selectedPrindi ?? {
        id: '',
        displayName: '',
        username: '',
        email: '',
        password: '',
        dataLindjes:'',
        nrTel: 0
    }
    console.log(selectedPrindi?.email);
    const [prindi, setPrindi] = useState(initialState);

    function handleSubmit() {
        prindi.id ? updatePrindi(prindi) : createPrindi(prindi);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setPrindi({ ...prindi, [name]: value })
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Emri' value={prindi.displayName} name='displayName' onChange={handleInputChange} />
                <Form.Input placeholder='Username' value={prindi.username} name='username' onChange={handleInputChange} />
                <Form.Input placeholder='Data e lindjes' value={prindi.dataLindjes} name='dataLindjes' onChange={handleInputChange} />
                <Form.Input placeholder='Email' value={prindi.email} name='email' onChange={handleInputChange} />
                <Form.Input type='Password' placeholder='Fjalkalimi' value={prindi.password} name='password' onChange={handleInputChange} />                
                <Form.Input placeholder='Nr. i Telefonit' value={prindi.nrTel} name='nrTel' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )

}
)