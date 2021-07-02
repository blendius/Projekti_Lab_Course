import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import { useState } from "react";
import { Salla } from "../../../app/models/salla";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";

export default observer(function SallaForm() {
    const { sallaStore } = useStore();
    const { selectedSalla, createSalla, updateSalla, closeForm, loading } = sallaStore;

    const initialState = selectedSalla ?? ({
        sallaId: '',
        emriSalles: ''
    });
    const validationSchema = Yup.object({
        emriSalles: Yup.string().required('Emri i salles eshte i nevojeshem').min(3),
    })
    const [salla] = useState(initialState);

    function handleFormSubmit(salla: Salla) {
        salla.sallaId ? updateSalla(salla) : createSalla(salla);
    }

    return (
        <Segment clearing>
            <Header content='Detajet e sallave' sub color='teal' />
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={salla} onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='emriSalles' placeholder='Emri i sallës' />
                        
                        <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})