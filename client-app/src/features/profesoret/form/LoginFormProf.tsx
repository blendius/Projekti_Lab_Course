import { Formik, Form, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';

export default observer(function LoginFormProf() {
    const { profesoriStore } = useStore();

    return (
        <Formik
            initialValues={
                {
                    id: '',
                    name:'',
                    displayName: '',
                    userName: '',
                    email: '',
                    password: '',
                    gradaAkademike: '',
                    dataRegjistrimit: '',
                    token: '',
                    error: null
                }
            }
            onSubmit={(values, { setErrors }) => profesoriStore.login(values).catch(error => setErrors({ error: 'Invalid email or password' }))}
        >

            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Kyçu në Shkollë!' color='teal' textAlign='center' />
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage name='error' render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />} />
                    <Button loading={isSubmitting} positive content='Kyçu' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
})