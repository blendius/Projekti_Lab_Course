import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';



export default observer(function ProfesoriForm() {

    const { profesoriStore } = useStore();
    const { selectedProfessor, closeForm, createProfessor, updateProfessor, loading } = profesoriStore;

    const initialState = selectedProfessor ?? {
        id: '',
        name: '',
        email: '',
        fjalkalimi: '',
        gradaAkademike: '',
        dataRegjistrimit: '',
        lenda: '',
        roli: ''
    }
    const [profesori, setProfesori] = useState(initialState);
    function handleSubmit() {
        profesori.id ? updateProfessor(profesori) : createProfessor(profesori); 
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setProfesori({ ...profesori, [name]: value })
    }
    // const Grada = [
    //     {
    //         key: 'Prof.',
    //         text: 'Prof.',
    //         value: 'Prof'
    //     },
    //     {
    //         key: 'MSc.',
    //         text: 'MSc.',
    //         value: 'MSc'
    //     },
    //     {
    //         key: 'PhD.',
    //         text: 'PhD.',
    //         value: 'PhD'
    //     }]
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Emri' value={profesori.name} name='name' onChange={handleInputChange} />
                <Form.Input placeholder='Email' value={profesori.email} name='email' onChange={handleInputChange} />
                {/* <Dropdown
                    placeholder='Grada Akademike:'
                    fluid
                    selection
                     options={Grada}
                    value={profesori.gradaAkademike}
                    name='gradaAkademike'
                   // onChange={handleInputChange}

                /> */}
                <Form.Input placeholder='Grada Akademike' value={profesori.gradaAkademike} name='gradaAkademike' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Data e Regjistrimit' value={profesori.dataRegjistrimit} name='dataRegjistrimit' onChange={handleInputChange} />
                <Form.Input placeholder='Lenda' value={profesori.lenda} name='lenda' onChange={handleInputChange} />
                <Form.Input type='password' placeholder='Fjalkalimi' value={profesori.fjalkalimi} name='fjalkalimi' onChange={handleInputChange} />
                <Form.Input placeholder='roli' value={profesori.roli} name='roli' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )

})