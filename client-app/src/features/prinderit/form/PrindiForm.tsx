import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button,  Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default observer(function PrindiForm() {
    const {prindiStore} = useStore();
    const {selectedPrindi, closeForm, createPrindi, updatePrindi, loading} = prindiStore;
    
    const initialState = selectedPrindi ?? {
        id: '',
        emri: '',
        mbiemri: '',
        email: '',
        fjalkalimi: '',
        nrTel: ''
    }
    
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
                <Form.Input placeholder='Emri' value={prindi.emri} name='emri' onChange={handleInputChange} />
                <Form.Input placeholder='Mbiemri' value={prindi.mbiemri} name='mbiemri' onChange={handleInputChange} />
                <Form.Input placeholder='email' value={prindi.email} name='email' onChange={handleInputChange} />
                <Form.Input type='password' placeholder='Fjalkalimi' value={prindi.fjalkalimi} name='fjalkalimi' onChange={handleInputChange} />                
                <Form.Input placeholder='nr. i Telefonit' value={prindi.nrTel} name='nrTel' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )

}
)