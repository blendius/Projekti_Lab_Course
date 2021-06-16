import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';

import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { gradaOptions, lendaOptions } from '../../../app/common/form/options';
import { Profesori } from '../../../app/models/profesori';
import { Professor } from '../../../app/models/professor';
import { useStore } from '../../../app/stores/store';



export default observer(function ProfesoriForm() {

    const { profesoriStore } = useStore();
    const { selectedProfessor, closeForm, loading, updateProfessor } = profesoriStore;

    const initialState = selectedProfessor ?? {
        id: '',
        name: '',
        email: '',
        username: '',
        displayName: '',
        password: '',
        gradaAkademike: '',
        dataRegjistrimit: '',
        token: ''

    }
    const validationSchema = Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
    })

    const [profesori] = useState(initialState);

    function handleFormSubmit(profesori: Professor) {
        updateProfessor(profesori);
    }

    return (
        <Segment clearing>
            <Formik validationSchema={validationSchema}
                enableReinitialize initialValues={initialState}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='email' placeholder='Email' />
                        <MyTextInput name='displayName' placeholder='Display Name' />
                        <MyTextInput name='username' placeholder='Username' />
                        <MyTextInput name='password' placeholder='Password' type='password' />
                        <MyTextInput name='GradaAkademike' placeholder='GradaAkademike' />
                        <MyTextInput name='DataRegjistrimit' placeholder='DataRegjistrimit' type='date' />
                        <Button disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )

})