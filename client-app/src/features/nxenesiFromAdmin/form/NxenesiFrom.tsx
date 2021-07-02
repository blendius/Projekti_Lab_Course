import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


const options_Class = [
    { key: "X1", text: "X/1", value: "X/1" },
    { key: "X2", text: "X/2", value: "X/2" },
    { key: "XI1", text: "XI/1", value: "XI/1" },
    { key: "XI2", text: "XI/2", value: "XI/2" },
    { key: "XII1", text: "XII/1", value: "XII/1" },
    { key: "XII2", text: "XII/2", value: "XII/2" },
];
const options_Registration = [
    { key: "1", text: 2018, value: 2018 },
    { key: "2", text: 2019, value: 2019 },
    { key: "3", text: 2020, value: 2020 },
];


export default observer(function NxenesiForm() {
    const { nxenesiStore } = useStore();
    const { nxenesiSelected, selectedNxenesi, updateNxenesin, createNxenesin, loading, closeForm } = nxenesiStore;

    const initialState = selectedNxenesi ?? {
        id: '',
        fullName: '',
        parentName: '',
        email: '',
        password: '',
        dateOfBirth: '',
        yearOfRegistration: 0,
        class: '',
        phoneNumber: ''
    };
    const [nxenesi, setNxenesin] = useState(initialState);

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    function handleSubmit() {
        nxenesi.id ? updateNxenesin(nxenesi) : createNxenesin(nxenesi);

    }

    function handleInputChange(event: any) {
        const { name, value } = event.target;
        setNxenesin((prevState) => ({ ...prevState, [name]: value }))
    }

    function handlePasswordChange(event: any) {
        const { name, value } = event.target;
        setPasswordData({ ...passwordData, [name]: value })
    }


    function setSelectValues(selectName: any, event: any) {
        const { innerText } = event.target;
        const value =
            selectName === "yearOfRegistration" ? parseInt(innerText) : innerText;
        setNxenesin({ ...nxenesi, [selectName]: value });
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input
                    placeholder='Emri dhe mbiemri'
                    value={nxenesi.fullName} name='fullName'
                    onChange={handleInputChange}
                />
                <Form.Input
                    placeholder='Emri i prindit'
                    value={nxenesi.parentName}
                    name='parentName'
                    onChange={handleInputChange}
                />
                <Form.Input
                    placeholder='Numri i telefonit'
                    value={nxenesi.phoneNumber}
                    name='phoneNumber'
                    onChange={handleInputChange}
                />
                <Form.Select
                    options={options_Class}
                    placeholder="Klasa"
                    value={nxenesi.class}
                    name='class'
                    onChange={(e) => setSelectValues("class", e)}
                />
                <Form.Select
                    options={options_Registration}
                    placeholder="Viti i regjistrimit"
                    value={nxenesi.yearOfRegistration}
                    name='yearOfRegistration'
                    onChange={(e) => setSelectValues("yearOfRegistration", e)}
                />
                <Form.Input
                    type='date'
                    placeholder='date'
                    value={nxenesi.dateOfBirth}
                    name='dateOfBirth'
                    onChange={handleInputChange} />
                <Form.Input
                    placeholder='Email'
                    value={nxenesi.email}
                    name='email'
                    onChange={handleInputChange}
                />
                {!!selectedNxenesi && <Form.Input type="password"
                    placeholder="Passwordi aktual"
                    value={passwordData.currentPassword}
                    name="currentPassword"
                    onChange={handlePasswordChange}
                />}
                <Form.Input
                    type="password"
                    placeholder="Passwordi i ri"
                    value={passwordData.newPassword}
                    name="newPassword"
                    onChange={(e) => handlePasswordChange(e)}
                />
                <Form.Input
                    type="password"
                    placeholder="Konfirmo passwordin"
                    value={passwordData.confirmPassword}
                    name="confirmPassword"
                    onChange={handlePasswordChange}
                />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='submit' content='Cancel' />

            </Form>
        </Segment>
    )
})