import { Formik, Form, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, Label } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { gradaOptions } from '../../../app/common/form/options';


export default observer(function RegisterFormProf() {
    const { profesoriStore, lendaStore } = useStore();
    const { lendaRegistry, lendetByDate } = lendaStore;

    useEffect(() => {
        lendaStore.loadLendet();
    }, [lendaStore])

    // var lenda = lendetByDate;
    // var arr: any = [];
    // var len = lendetByDate.length;
    // for (var i = 0; i < len; i++) {
    //     arr.push({
    //         text: lenda[i].emriLendes,
    //         value: lenda[i].lendaId
    //     });
    // }

    return (
        <Formik
            initialValues={
                {
                    id: '',
                    name: '',
                    userName: '',
                    email: '',
                    password: '',
                    gradaAkademike: '',
                    dataRegjistrimit: '',
                    token: '',
                    error: null,
                    LendaId: ''
                }

            }
            onSubmit={(values, { setErrors }) => profesoriStore.register(values, values.LendaId).catch(error => setErrors({ error: 'Invalid email or password' }))}
            validationSchema={Yup.object({
                name: Yup.string().required("DisplayName eshte i nevojshem!"),
                userName: Yup.string().required("Username eshte i nevojshem!"),
                email: Yup.string().required("Email eshte i nevojshem!").email(),
                password: Yup.string().required("Passwordi eshte i nevojshem!").matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    "Duhet te i permbaj 8 karaktere, Nje Shkronje te madhe, Nje Shkronje te vogel, Nje Number and Nje karakter special"
                ),
                LendaId: Yup.string().required("Zgjedhja e lendes eshte e nevojshem!"),
                gradaAkademike: Yup.string().required("Zgjedhja e grades akademike eshte e nevojshem!")
            })}
        >

            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='name' placeholder='Display Name' />
                    <MyTextInput name='userName' placeholder='Username' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <MySelectInput options={gradaOptions} name='gradaAkademike' placeholder='GradaAkademike' />
                    <MySelectInput options=
                        {
                            lendetByDate.map(lenda => (
                                {
                                    key: lenda.lendaId,
                                    text: lenda.emriLendes,
                                    value: lenda.lendaId,

                                }

                            ))
                        } placeholder='LendaId' name='LendaId' />

                    <MyTextInput name='dataRegjistrimit' placeholder='DataRegjistrimit' type='date' />
                    <ErrorMessage name='error' render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />} />
                    <Button positive content='Register' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
})