import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import { useState } from "react";
import { Paralelja } from "../../../app/models/paralelja";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";

export default observer(function ParaleljaForm() {
    const { paraleljaStore } = useStore();
    const { selectedParalelja, createParalelja, updateParalelja, closeForm, loading } = paraleljaStore;

    const initialState = selectedParalelja ?? ({
        paraleljaId: '',
        numri: 0,
        kapacitetiMax: 0,
        kapacitetiMin: 0
    });
    const validationSchema = Yup.object({
        numri: Yup.number().required('Numri i paraleles eshte i nevojshem').min(1),
    })
    const [paralelja] = useState(initialState);

    function handleFormSubmit(paralelja: Paralelja) {
        if (paralelja?.kapacitetiMax > 35 && paralelja?.kapacitetiMin < 8) {
            alert("Duhet te jete ne mes te 35 dhe 8")
        } else {
            paralelja.paraleljaId ? updateParalelja(paralelja) : createParalelja(paralelja);
        }
    }

    return (
        <Segment clearing>
            <Header content='Detajet e Paraleleve' sub color='teal' />
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={paralelja} onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='numri' placeholder='Numri' />
                        <MyTextInput name='kapacitetiMax' placeholder='Kapaciteti Maksimal' />
                        <MyTextInput name='kapacitetiMin' placeholder='Kapaciteti Minimal' />
                        <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})