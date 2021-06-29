import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';

import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { gradaOptions, lendaOptions } from '../../../app/common/form/options';
import { Professor } from '../../../app/models/professor';
import { useStore } from '../../../app/stores/store';



export default observer(function ProfesoriForm() {

    const { lendaStore, profesoriStore } = useStore();
    const { prof, closeForm, loading, updateProfessor } = profesoriStore;
    const { lendaRegistry, lendetByDate } = lendaStore;


    const initialState = prof ?? {
        id: '',
        name: '',
        email: '',
        username: '',
        displayName: '',
        password: '',
        gradaAkademike: '',
        dataRegjistrimit: '',
        token: '',
        EmriLendes: ''

    }
    const validationSchema = Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
        EmriLendes: Yup.string().required('Lenda duhet te plotesohet!'),

    })

    const [profesori] = useState(initialState);

    function handleFormSubmit(profesori: Professor) {
        updateProfessor(profesori);
    }

    return (
        <Segment clearing>
            <Formik validationSchema={validationSchema}
                enableReinitialize initialValues={profesori}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='email' placeholder='Email' />
                        <MyTextInput name='displayName' placeholder='Display Name' />
                        <MyTextInput name='username' placeholder='Username' />
                        <MyTextInput name='password' placeholder='Password' type='password' />
                        <MySelectInput options={gradaOptions} name='gradaAkademike' placeholder='GradaAkademike' />
                        <MySelectInput options=
                            {
                                lendetByDate.map(lenda => (
                                    {
                                        key: lenda.lendaId,
                                        text: lenda.emriLendes,
                                        value: lenda.emriLendes
                                    }
                                ))
                            } placeholder='Lenda' name='EmriLendes' />
                        <MyTextInput name='DataRegjistrimit' placeholder='dataRegjistrimit' type='date' />
                        <Button disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )

})