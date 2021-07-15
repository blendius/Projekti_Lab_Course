import { useStore} from "../../../app/stores/store";
import React, { ChangeEvent, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, Form, Segment } from "semantic-ui-react";;


export default observer(function NjoftimiForm() {
    const {njoftimiStore} = useStore();
    const {selectedNjoftimi, closeForm, createNjoftimin, updateNjoftimin, loading} = njoftimiStore;
    
    const initialState = selectedNjoftimi ?? {
        njoftimiId: '',
        titulli: '',
        pershkrimi:'',
        dataEShtimit: ''
    }
    const [errors, setErrors] = useState({pershkrimiError: false, titulliError: false, dataError: false})
    const [submitClicked, setSubmitClicked] = useState(false)

    const [njoftimi, setNjoftimi] = useState(initialState);

    useEffect(()=>{
        if(submitClicked){
            setErrors({pershkrimiError: !njoftimi.pershkrimi.trim(),
                titulliError: !njoftimi.titulli.trim(),
                dataError: !njoftimi.dataEShtimit })
        }
    },[njoftimi])

    function handleSubmit() {
        setSubmitClicked(true)
        setErrors({pershkrimiError: !njoftimi.pershkrimi.trim(),
            titulliError: !njoftimi.titulli.trim(),
            dataError: !njoftimi.dataEShtimit })
        if(njoftimi.pershkrimi.trim() && njoftimi.titulli.trim() && njoftimi.dataEShtimit)
            	njoftimi.njoftimiId ? updateNjoftimin(njoftimi) : createNjoftimin(njoftimi);
    }
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
    
        setNjoftimi({...njoftimi, [name]: value})
    }
    return (
        <Segment clearing>
             <Form onSubmit={handleSubmit} autoComplete='off'>
                {
                    errors.titulliError && <span style={{color:"red"}}>Titulli duhet te plotesohet!</span>
                }
                <Form.Input placeholder='Titulli' value={njoftimi.titulli} name='titulli' onChange={handleInputChange}/>
                {
                    errors.pershkrimiError && <span style={{color:"red"}}>Pershkrimi duhet te plotesohet!</span>
                }
                <Form.TextArea placeholder='Pershkrimi' value={njoftimi.pershkrimi} name='pershkrimi' onChange={handleInputChange}/>
                {
                    errors.dataError && <span style={{color:"red"}}>Data duhet te plotesohet!</span>
                }
                <Form.Input type='date' placeholder='Data' value={njoftimi.dataEShtimit} name='dataEShtimit' onChange={handleInputChange}/>
                
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form> 
        </Segment>
    )
    
})