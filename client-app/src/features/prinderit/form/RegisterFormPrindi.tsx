import { Formik, Form, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Label } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';


export default observer(function RegisterFormPrindi() {
    const { prindStoreAccount } = useStore();

    return (
        <Formik
            initialValues={{ displayName: '', username: '', email: '', password:'', dataLindjes: '', nrTel:0,error: null }}
            onSubmit={(values, { setErrors }) => prindStoreAccount.register(values).catch(error => setErrors({ error: 'Email ose password gabim' }))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
        >

            {({ handleSubmit, isSubmitting, errors , isValid, dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='displayName' placeholder='Display Name' />
                    <MyTextInput name='username' placeholder='Username' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <MyTextInput name='dataLindjes' placeholder='Data e Lindjes' type='date' />
                    <MyTextInput name='nrTel' placeholder='Numri i Telefonit'  />
                    <ErrorMessage name='error' render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />} />
                    <Button disabled={!isValid|| !dirty || isSubmitting} loading={isSubmitting} positive content='Register' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
})