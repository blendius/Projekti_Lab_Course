import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { setSourceMapRange } from 'typescript';


const options_Class = [
    { key: "10-1", text: "10-1", value: "10-1" },
    { key: "10-2", text: "10-2", value: "10-2" },
    { key: "11-1", text: "11-1", value: "11-1" },
    { key: "11-2", text: "11-2", value: "11-2" },
    { key: "12-1", text: "12-1", value: "12-1" },
    { key: "12-2", text: "12-2", value: "12-2" },
];
const options_Registration = [
    { key: "1", text: 2018, value: 2018 },
    { key: "2", text: 2019, value: 2019 },
    { key: "3", text: 2020, value: 2020 },
];


export default observer(function NxenesiForm() {
    const { nxenesiStore } = useStore();
    const { nxenesiSelected, selectedNxenesi, updateNxenesin, createNxenesin, register, loading, closeForm } = nxenesiStore;

    const initialState = selectedNxenesi ?? {
        id: '',
        fullName: '',
        parentName: '',
        email: '',
        password: '',
        dateOfBirth: '',
        yearOfRegistration: 0,
        class: '',
        phoneNumber: '',
        token: '',
        userName: "",
        displayName: ""
    };
    const [errors, setErrors] = useState({nameError: false, parentError: false, 
                                        emailError: false, passwordError: false,
                                        dateError: false, yearError: false, 
                                        classError: false, phoneError: false})
    const [submitClicked, setSubmitClicked] = useState(false)
    
    const [nxenesi, setNxenesin] = useState(initialState);

    useEffect(()=>{
        if(submitClicked){
            setErrors({nameError: !nxenesi.fullName.trim(),
                parentError: !nxenesi.parentName.trim(),
                emailError: !nxenesi.email.trim(),
                passwordError: !selectedNxenesi && !nxenesi.password,
                dateError: !nxenesi.dateOfBirth,
                yearError: !nxenesi.yearOfRegistration,
                phoneError: !nxenesi.phoneNumber.trim(),
                classError: !nxenesi.class.trim()
                })
        }
    },[nxenesi])

    useEffect(()=>{
        setNxenesin((prevState) => ({ ...prevState, "userName": nxenesi.email }))
    },[nxenesi.email])
    useEffect(()=>{
        setNxenesin((prevState) => ({ ...prevState, "displayName": nxenesi.fullName }))
    },[nxenesi.fullName])
    // const [passwordData, setPasswordData] = useState({
    //     currentPassword: "",
    //     newPassword: "",
    //     confirmPassword: "",
    // })

   // const [nxenesi] = useState(initialState);


    function handleSubmit() {
        setSubmitClicked(true)
        setErrors({nameError: !nxenesi.fullName.trim(),
            parentError: !nxenesi.parentName.trim(),
            emailError: !nxenesi.email.trim(),
            passwordError: !selectedNxenesi && !nxenesi.password,
            dateError: !nxenesi.dateOfBirth,
            yearError: !nxenesi.yearOfRegistration,
            phoneError: !nxenesi.phoneNumber.trim(),
            classError: !nxenesi.class.trim()
            })
            console.log("nxenesi:", nxenesi)
        if(nxenesi.fullName.trim() && nxenesi.parentName.trim() 
        && nxenesi.dateOfBirth 
            && nxenesi.yearOfRegistration && nxenesi.class.trim() && nxenesi.email.trim()) {
                if(nxenesi.id)
                    updateNxenesin(nxenesi)
                else if(nxenesi.password)
                {
                    register(nxenesi)
                    window.location.reload();
                    
        }}
       
    }
    function handleInputChange(event: any) {
        const { name, value } = event.target;
        setNxenesin((prevState) => ({ ...prevState, [name]: value }))
    }
    // function handlePasswordChange(event: any) {
    //     const { name, value } = event.target;
    //     setPasswordData({ ...passwordData, [name]: value })
    // }
    function setSelectValues(selectName: any, event: any) {
        const { innerText } = event.target;
        const value =
            selectName === "yearOfRegistration" ? parseInt(innerText) : innerText;
        setNxenesin({ ...nxenesi, [selectName]: value });
    }
   

    return (

    //     <Segment clearing>
    //     <Formik
    //         enableReinitialize initialValues={nxenesi}
    //         onSubmit={values => handleFormSubmit(values)}>
    //         {({ handleSubmit, isValid, isSubmitting, dirty }) => (
    //             <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
    //                 <MyTextInput name='fullName' placeholder='Emri dhe mbiemri' />
    //                 <MyTextInput name='parentName' placeholder='Emri i prindit' />
    //                 <MyTextInput name='phoneNumber' placeholder='Numri i telefonit' />
    //                 <MySelectInput options={options_Class} name='class' placeholder='Klasa' />
    //                 <MySelectInput options={options_Registration} name='yearOfRegistration' placeholder='Viti i regjistrimit' />
    //                 <MyTextInput name='dateOfBirth' placeholder='Datelindja' type='date' />
    //                 <MyTextInput name='email' placeholder='Email' />
    //                 <MyTextInput name='currentPassword' placeholder='Current Password' type='password' />
    //                 <MyTextInput name='newPassword' placeholder='New Password' type='password' />
    //                 <MyTextInput name='confirmPassword' placeholder='Confirm Password' type='password' />
    //                 <Button disabled={isSubmitting || !dirty}
    //                     loading={loading} floated='right' positive type='submit' content='Submit' />
    //                 <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
    //             </Form>
    //         )}
    //     </Formik>

    // </Segment>
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                {
                    errors.nameError && <span style={{color:"red"}}>Emri duhet te plotesohet!</span>
                }
                <Form.Input
                    placeholder='Emri dhe mbiemri'
                    value={nxenesi.fullName} name='fullName'
                    onChange={handleInputChange}
                />
                {
                    errors.parentError && <span style={{color:"red"}}>Emri i prindit duhet te plotesohet!</span>
                }
                <Form.Input
                    placeholder='Emri i prindit'
                    value={nxenesi.parentName}
                    name='parentName'
                    onChange={handleInputChange}
                />
                {
                    errors.phoneError && <span style={{color:"red"}}>Numri i telefonit duhet te plotesohet!</span>
                }
                <Form.Input
                    placeholder='Numri i telefonit'
                    value={nxenesi.phoneNumber}
                    name='phoneNumber'
                    onChange={handleInputChange}
                />
                {
                    errors.classError && <span style={{color:"red"}}>Klasa duhet te plotesohet!</span>
                }
                <Form.Select
                    options={options_Class} 
                    placeholder="Klasa"
                    value={nxenesi.class}
                    name='class'
                    onChange={(e) => setSelectValues("class", e)}
                />
                {
                    errors.yearError && <span style={{color:"red"}}>Viti i regjistrimit duhet te plotesohet!</span>
                }

                <Form.Select
                    options={options_Registration}
                    placeholder="Viti i regjistrimit"
                    value={nxenesi.yearOfRegistration}
                    name='yearOfRegistration'
                    onChange={(e) => setSelectValues("yearOfRegistration", e)}
                />
                {
                    errors.dateError && <span style={{color:"red"}}>Data duhet te plotesohet!</span>
                }
                <Form.Input
                    type='date'
                    placeholder='date'
                    value={nxenesi.dateOfBirth}
                    name='dateOfBirth'
                    onChange={handleInputChange} />
                {
                    errors.emailError && <span style={{color:"red"}}>Email duhet te plotesohet!</span>
                }
                <Form.Input
                    placeholder='Email'
                    value={nxenesi.email}
                    name='email'
                    onChange={handleInputChange}
                />
             
                 {
                    errors.passwordError && !selectedNxenesi && <span style={{color:"red"}}>Passwordi duhet te plotesohet!</span>
                }
                {!selectedNxenesi && <Form.Input
                    type="password"
                    placeholder="Passwordi i ri"
                    name="password"
                    onChange={handleInputChange}
                />}
            
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='submit' content='Cancel' />

            </Form>
        </Segment>
    )
})