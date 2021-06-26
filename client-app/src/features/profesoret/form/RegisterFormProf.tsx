import { Formik, Form, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Label } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';


export default observer(function RegisterFormProf() {
    const { profesoriStore } = useStore();

    return (
        <Formik
            initialValues={{id:'', displayName: '', username: '', email: '', password: '',GradaAkademike:'',DataRegjistrimit:'', error: null }}
            onSubmit={(values, { setErrors }) => profesoriStore.register(values).catch(error => setErrors({ error: 'Invalid email or password' }))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
        >

            {({ handleSubmit, isSubmitting, errors , isValid,dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='displayName' placeholder='Display Name' />
                    <MyTextInput name='username' placeholder='Username' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <MyTextInput name='GradaAkademike' placeholder='GradaAkademike' />
                    <MyTextInput name='DataRegjistrimit' placeholder='DataRegjistrimit' type='date' />
                    <ErrorMessage name='error' render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />} />
                    <Button disabled={!isValid|| !dirty || isSubmitting} loading={isSubmitting} positive content='Register' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
})