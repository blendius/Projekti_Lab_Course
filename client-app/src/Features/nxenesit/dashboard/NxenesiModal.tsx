import axios from 'axios';
import { useEffect, useState } from 'react'
import { Button, Form, Grid, Header, Image, Input, Message, Modal } from 'semantic-ui-react'

import SemanticDatepicker from 'react-semantic-ui-datepickers';
interface ModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    nxenesi: any
}

const options_Class = [
    { key: 'X1', text: 'X/1', value: 'X/1'},
    { key: 'X2', text: 'X/2', value: 'X/2'},
    { key: 'XI1', text: 'XI/1', value: 'XI/1'},
    { key: 'XI2', text: 'XI/2', value: 'XI/2'},
    { key: 'XII1', text: 'XII/1', value: 'XII/1'},
    { key: 'XII2', text: 'XII/2', value: 'XII/2'},
]
const options_Registration = [
    { key: '1', text: 2018, value: 2018},
    { key: '2', text: 2019, value: 2019},
    { key: '3', text: 2020, value: 2020},
]

function NxenesiModal(props: ModalProps) {
    const { open, setOpen, nxenesi } = props;

    const [currentData, setCurrentData] = useState({
        ...nxenesi,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        dateOfBirth: new Date(nxenesi.dateOfBirth)
    })

    function resetCurrentData() {
        setCurrentData({
            ...nxenesi,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            dateOfBirth: new Date(nxenesi.dateOfBirth)
        })
    }
    function updateNxenesi(nxenesiId: any) {
        axios.put(`http://localhost:5000/api/Nxenesi/${nxenesiId}`, currentData)
            .then(()=> {window.location.reload()})
            .catch(err => console.log(err));
        resetCurrentData();
        setOpen(false)
    }

    useEffect(() => {
        resetCurrentData();
    }, [nxenesi]);
    
    function handleInputChange(event: any) {
        const {name, value} = event.target;
        setCurrentData({...currentData, [name]: value})
    }
    function setSelectValues(selectName: any, event: any) {
        const { innerText } = event.target;
        const value = selectName === "yearOfRegistration" ? parseInt(innerText) : innerText 
        setCurrentData({...currentData, [selectName]: value})
    }
    function onDateChange(event:any, data:any) {
        setCurrentData({
            ...currentData,
            dateOfBirth: data.value});
    }
    console.log("currentData:", currentData)
    return (
        <Modal
        onClose={() => {
            setOpen(false);
            resetCurrentData();
        }}
        open={open}
        autoComplete='off'
        >
        <Modal.Header>Edito te dhenat</Modal.Header>
        <Modal.Content image>
            <Modal.Description>
            <Form>
            <Form.Group widths='equal'>
                
                <Form.Input label='Emri dhe mbiemri' placeholder="Emri" value={currentData.fullName} name='fullName' onChange={(event)=> handleInputChange(event)}/>
            
                <Form.Input label='Emri i prindit' placeholder="Prindi" value={currentData.parentName} name='parentName' onChange={handleInputChange}/>
    
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input label='Email' placeholder='joe@schmoe.com' value={currentData.email} name='email' onChange={handleInputChange}/>
                    <Form.Field>
                        <label>Numri i telefonit</label>
                        <Input placeholder='(xxx)-xxx-xxx' value={currentData.phoneNumber} name='phoneNumber' onChange={handleInputChange} />
                     </Form.Field>
                </Form.Group>

                <Form.Group widths='equal'>
                <Form.Field>
                    <label>Klasa</label>
                    <Form.Select options={options_Class} placeholder='Klasa' defaultValue={currentData.class} name='class' onChange={(e) => setSelectValues("class", e)}/>
                </Form.Field>
                <Form.Field>
                    <label>Viti i regjistrimit</label>
                    <Form.Select options={options_Registration} placeholder="2020" defaultValue={currentData.yearOfRegistration} name='yearOfRegistration'  onChange={(e) => setSelectValues("yearOfRegistration", e)}/>
                </Form.Field>
                <Form.Field>
                <label>Data e lindjes</label>

                <SemanticDatepicker value = {currentData.dateOfBirth} onChange={onDateChange} />
                </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Field>
                    <label>Passwordi aktual</label>
                    <Input type='password' placeholder= 'Passwordi aktual' value = {currentData.currentPassword} name='currentPassword' onChange={handleInputChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Passwordi i ri</label>
                    <Input type='password' placeholder='Passwordi i ri' value = {currentData.newPassword} name='newPassword' onChange={handleInputChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Konfirmo passwordin</label>
                    <Input type='password' placeholder='Konfirmo passwordin' value = {currentData.confirmPassword} name='confirmPassword' onChange={handleInputChange}/>
                </Form.Field>
                </Form.Group>
            </Form>

            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button color='black' onClick={() => {
                setOpen(false);
                resetCurrentData();
                }}>
            Anulo
            </Button>
            <Button
            content="Edito"
            labelPosition='right'
            icon='checkmark'
            type='submit'
            onClick={() => updateNxenesi(nxenesi.id)}
            positive
            />
        </Modal.Actions>
        </Modal>
    )
}

export default NxenesiModal