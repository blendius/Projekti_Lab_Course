import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';

import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { gradaOptions, lendaOptions } from '../../../app/common/form/options';
import { Profesori } from '../../../app/models/profesori';
import { useStore } from '../../../app/stores/store';



export default observer(function ProfesoriForm() {

    const { profesoriStore } = useStore();
    const { selectedProfessor, closeForm, loading,updateProfessor,createProfessor } = profesoriStore;

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
    const validationSchema = Yup.object({
        name: Yup.string().required('Emri duhet te plotesohet !'),
        lenda: Yup.string().required('Lenda duhet te plotesohet!'),
        fjalkalimi: Yup.string().required('Fjalkalimi duhet te plotesohet!'),
        gradaAkademike: Yup.string().required('GradaAkademike duhet te plotesohet!'),
        dataRegjistrimit: Yup.string().required('Data duhet te plotesohet!'),
        roli: Yup.string().required('Roli duhet te plotesohet!'),
        email: Yup.string().email('Shkruani nje email valide')
    })

    const [profesori, setProfesori] = useState(initialState);

    function handleFormSubmit(profesori:Profesori) {
        profesori.id ? updateProfessor(profesori) : createProfessor(profesori); 
    }
   
    return (
        <Segment clearing>
            <Formik validationSchema={validationSchema}
                enableReinitialize initialValues={profesori}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting,dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput type='text' name='name' placeholder='Emri'></MyTextInput>
                        <MyTextInput type='text' placeholder='Email' name='email' />
                        <MySelectInput options={gradaOptions} placeholder='Grada Akademike' name='gradaAkademike' />
                        <MyTextInput type='date' placeholder='Data e Regjistrimit' name='dataRegjistrimit' />
                        <MySelectInput options={lendaOptions} placeholder='Lenda' name='lenda' />
                        <MyTextInput type='password' placeholder='Fjalkalimi' name='fjalkalimi' />
                        <MyTextInput type='text' placeholder='roli' name='roli' />
                        <Button disabled={isSubmitting || !dirty|| !isValid}
                        loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )

})