import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button,  Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default observer(function PrindiForm() {
    const {prindiStore, prindStoreAccount } = useStore();
    const {selectedPrindi, closeForm, createPrindi, updatePrindi, loading} = prindiStore;
    
    const initialState = selectedPrindi ??  {
        id: '',
        displayName: '',
        userName: '',
        email: '',
        password: '',
        dataLindjes:'',
        phoneNumber: 0
    }
    console.log("here");
    const [prindi, setPrindi] = useState(initialState);

    function handleSubmit() {
        prindi.id ? updatePrindi(prindi) : createPrindi(prindi);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setPrindi({ ...prindi, [name]: value })
    }
    console.log(prindi.userName)

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Emri' value={prindi.displayName} name='displayName' onChange={handleInputChange} />
                <Form.Input placeholder='Username' value={prindi.userName} name='userName' onChange={handleInputChange} />
                <Form.Input placeholder='Data e lindjes' value={prindi.dataLindjes} name='dataLindjes' onChange={handleInputChange} />
                <Form.Input placeholder='Email' value={prindi.email} name='email' onChange={handleInputChange} />
                <Form.Input type='Password' placeholder='Fjalkalimi' value={prindi.password} name='UserName' onChange={handleInputChange} />                
                <Form.Input placeholder='Nr. i Telefonit' value={prindi.phoneNumber} name='phoneNumber' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )

}
)