import { Formik, Form } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Dropdown, List, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { Laburatori } from '../../../app/models/laburatori';
import { gradaOptions, labOptions, lendaOptions } from '../../../app/common/form/options';



export default observer(function LaburatoriForm() {

    const { laburatoriStore, lendaStore } = useStore();
    const { selectedLaburatori, closeForm, loading, updateLaburatori, createLaburatori } = laburatoriStore;
    const { lendaRegistry, lendetByDate } = lendaStore;

    const initialState = selectedLaburatori ?? {
        id: '',
        lloji: '',
        dataEKrijimit: '',
        lendaId: '',
        nrPaisjeve: 0
    }
    const validationSchema = Yup.object({
        lloji: Yup.string().required('Lloji duhet te plotesohet !'),
        lendaId: Yup.string().required('Lenda duhet te plotesohet!'),
        dataEKrijimit: Yup.string().required('Data duhet te plotesohet!'),
        nrPaisjeve: Yup.string().required('Roli duhet te plotesohet!')
    })

    const [laburatori, setLaburatori] = useState(initialState);

    function handleFormSubmit(laburatori: Laburatori) {
        laburatori.id ? updateLaburatori(laburatori) : createLaburatori(laburatori, laburatori.lendaId);
    }
    // const lendaOpt = [

    //     lendetByDate.map(lenda => (
    //         {
    //             key: lenda.lendaId,
    //             text: lenda.emriLendes,
    //             value: lenda.emriLendes
    //         }
    //     ))

    // ]
    var lendaOpt: any;

    return (
        <Segment clearing>

            {/* { lendaOpt = [
        lendetByDate.map(lenda => (
            <Dropdown.Item key={lenda.lendaId} text={lenda.emriLendes} value={lenda.emriLendes}></Dropdown.Item>
        ))
    ]} */}



            <Formik validationSchema={validationSchema}
                enableReinitialize initialValues={laburatori}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MySelectInput options={labOptions} placeholder='Lloji' name='lloji' />
                        <MyTextInput type='date' placeholder='Data e Krijimit' name='dataEKrijimit' />

                        <MySelectInput options=
                            {
                                lendetByDate.map(lenda => (
                                    {
                                   key:lenda.lendaId,
                                    text:lenda.emriLendes,
                                     value:lenda.lendaId}
                                ))
                            } placeholder='Lenda' name='lendaId' />

                        <MyTextInput type='text' placeholder='Numri i Paisjeve' name='nrPaisjeve' />
                        <Button
                            loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )

})