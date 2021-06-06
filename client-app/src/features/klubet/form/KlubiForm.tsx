import { Formik, Form } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { Klubi } from '../../../app/models/klubi';



export default observer(function KlubiForm() {

    const { klubiStore } = useStore();
    const { selectedKlubi, closeForm, loading,updateKlubi,createKlubi } = klubiStore;

    const initialState = selectedKlubi ?? {
        id: '',
        emriKlubit: '',
        llojiKlubit: '',
        pershkrimi: '',
        nrAntareve: '',
        udheheqesi: '',
        dataRregjistrimit: '', 
     
    }
    const validationSchema = Yup.object({
        emriKlubit: Yup.string().required('Emri duhet te plotesohet !'),
        llojiKlubit: Yup.string().required('Lloji duhet te plotesohet!'),
        pershkrimi: Yup.string().required('Pershkrimi duhet te plotesohet!'),
        nrAntareve: Yup.string().required('Nr antareve duhet te plotesohet!'),
        dataRregjistrimit: Yup.string().required('Data duhet te plotesohet!'),
        udheheqesi: Yup.string().required('Udheheqesi duhet te plotesohet!'),
        
    })

    const [klubi, setKlubi] = useState(initialState);

    function handleFormSubmit(klubi:Klubi) {
        klubi.id ? updateKlubi(klubi) : createKlubi(klubi); 
    }
   
    return (
        <Segment clearing>
            <Formik validationSchema={validationSchema}
                enableReinitialize initialValues={klubi}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting,dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput type='text' name='emriKlubit' placeholder='Emri Klubit'></MyTextInput>
                        <MyTextInput type='text' placeholder='Lloji Klubit' name='llojiKlubit' />
                        <MyTextInput type='text' placeholder='Pershkrimi' name='pershkrimi' />
                        <MyTextInput type='date' placeholder='Data e Regjistrimit' name='dataRregjistrimit' />
                        <MyTextInput type='text' placeholder='Nr Antareve' name='nrAntareve' />
                        <MyTextInput type='text' placeholder='Udheheqesi' name='udheheqesi' />

                        <Button disabled={isSubmitting || !dirty|| !isValid}
                        loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )

})