import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import * as Yup from 'yup';
import MySelectInput from "../../../app/common/form/MySelectInput";
import { vitiOptions } from "../../../app/common/form/options";
import { Klasa } from "../../../app/models/klasa";
import { useStore } from "../../../app/stores/store";

export default observer(function KlasaForm() {
    const { klasaStore, paraleljaStore, sallaStore } = useStore();
    const { selectedKlasa, createKlasa, updateKlasa, closeForm, loading } = klasaStore;
    const { paraleletByNumri } = paraleljaStore;
    const {sallatByName} = sallaStore;

    useEffect(()=>{
        sallaStore.loadSallat();
        paraleljaStore.loadParalelet();
    },[paraleljaStore, sallaStore])

    const initialState = selectedKlasa ?? ({
        klasaId: '',
        viti: 0,
        paraleljaId: '',
        sallaId: ''
    });
    const validationSchema = Yup.object({
        viti: Yup.string().required('Viti eshte i nevojeshem').min(2),
        paraleljaId: Yup.string().required('Paralelja eshte e nevojesheme').min(1),
    })
    const [klasa] = useState(initialState);
    function handleFormSubmit(klasa: Klasa) {
        klasa.klasaId ? updateKlasa(klasa, klasa.paraleljaId, klasa.sallaId) : createKlasa(klasa, klasa.paraleljaId, klasa.sallaId);
    }

    return (
        <Segment clearing>
            <Header content='Detajet e Klasave' sub color='teal' />
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={klasa} onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MySelectInput options={vitiOptions} placeholder="Viti" name="viti" />
                        <MySelectInput options=
                            {
                                paraleletByNumri.map(paralelja => (
                                    {
                                        key: paralelja.paraleljaId,
                                        text: paralelja.numri,
                                        value: paralelja.paraleljaId
                                    }
                                ))
                            } placeholder='Paralelja' name='paraleljaId' />
                        <MySelectInput options=
                            {
                                sallatByName.map(salla => (
                                    {
                                        key: salla.sallaId,
                                        text: salla.emriSalles,
                                        value: salla.sallaId
                                    }
                                ))
                            } placeholder='Salla' name='sallaId' />

                        <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})