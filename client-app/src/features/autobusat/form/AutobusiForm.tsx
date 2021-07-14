import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import * as Yup from "yup";
import { useStore } from "../../../app/stores/store";
import { Form, Formik } from "formik";
import { Button, Segment } from "semantic-ui-react";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { Orari } from "../../../app/models/orari";
import MyDataInput from "../../../app/common/form/MyDateInput";
import { useEffect } from "react";
import { Pajisja } from "../../../app/models/pajisja";
import { Autobusi } from "../../../app/models/Autobusi";

export default observer(function OrariiForm() {
    const { autobusiStore } = useStore();

    const { selectedAutobusi, closeForm, createAutobusi, updateAutobusi, loading } = autobusiStore;

    const initialState = selectedAutobusi ?? {
        autobusiId: '',
        targat: '',
        brendi: '',
        vitiProdhimit: '',
        nrPasagjereve: 0,
        oraNisjes:'',
    }
    const [autobusi, setAutobusi] = useState(initialState);
    function handleSubmit(autobusi: Autobusi) {
        autobusi.autobusiId ? updateAutobusi(autobusi) : createAutobusi(autobusi);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setAutobusi({ ...autobusi, [name]: value });
    }
    return (
        <Segment clearing>
            <Formik
                // validationSchema={validationSchema}
                enableReinitialize
                initialValues={initialState}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput type='text' placeholder='targa' name='targat' />
                        <MyTextInput type='text' placeholder='brend' name='brendi' />
                        <MyTextInput type='date' placeholder='viti prodhimit' name='vitiProdhimit' />
                        <MyTextInput type='number' placeholder='nr pasa' name='nrPasagjereve' />
                        <MyTextInput type='time' placeholder='Ora nisjes' name='oraNisjes' />


                        <Button
                            // disabled={isSubmitting || !dirty || !isValid}
                            loading={loading}
                            floated="right"
                            positive
                            type="submit"
                            content="Submit"
                        />
                        <Button
                            onClick={closeForm}
                            floated="right"
                            type="button"
                            content="Cancel"
                        />
                    </Form>
                )}
            </Formik>
        </Segment>
    );
});
