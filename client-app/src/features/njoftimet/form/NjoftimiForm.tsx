import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Njoftimi } from "../../../app/models/njoftimi";
import { useStore } from "../../../app/stores/store";


export default observer(function NjoftimiForm() {
    const {njoftimiStore} = useStore();
    const {selectedNjoftimi, closeForm, createNjoftimin, updateNjoftimin, loading} = njoftimiStore;
    
    const initialState = selectedNjoftimi ?? {
        njoftimiId: '',
        titulli: '',
        pershkrimi:'',
        dataEShtimit: ''
    }

    const [njoftimi, setNjoftimi] = useState(initialState);

    function handleSubmit() {
       njoftimi.njoftimiId ? updateNjoftimin(njoftimi) : createNjoftimin(njoftimi);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setNjoftimi({...njoftimi, [name]: value})
    }
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Titulli' value={njoftimi.titulli} name='titulli' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Pershkrimi' value={njoftimi.pershkrimi} name='pershkrimi' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Data' value={njoftimi.dataEShtimit} name='dataEShtimit' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})