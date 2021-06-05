import { Formik } from 'formik';
import { values } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Form } from 'semantic-ui-react';

import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';

export default observer(function LoginForm() {
    const { adminStore } = useStore();
    return (
        <Formik initialValues={{ email: '', password: '' }}
            onSubmit={values => adminStore.login(values)}>
            {({ handleSubmit, isSubmitting }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off '>
                    <MyTextInput name='email' placeholder='Email' />

                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <Button loading={isSubmitting} positive content='Kyqu' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
})