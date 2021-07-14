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
import { Aktiviteti } from "../../../app/models/Aktiviteti";

export default observer(function AktivitetiForm() {
    const { aktivitetiStore } = useStore();
    const { sallaStore } = useStore();
    const { sallatByName, loadSallat } = sallaStore;

    const { selectedAktiviteti, closeForm, createAktiviteti, updateAktiviteti, loading } = aktivitetiStore;

    const initialState = selectedAktiviteti ?? {
        aktivitetiId: '',
        emri: '',
        pershkrimi: '',
        dataMbajtjes: '',
        emriSalles: '',
    }

    useEffect(() => {
        loadSallat();
    }, []);
    const [aktiviteti, setAktiviteti] = useState(initialState);
    var salla = sallatByName;
    var arr: any = [];
    var len = sallatByName.length;
    for (var i = 0; i < len; i++) {
        arr.push({
            text: salla[i].emriSalles,
            value: salla[i].emriSalles,
        });
    }
    function handleSubmit(aktiviteti: Aktiviteti) {
        aktiviteti.aktivitetiId ? updateAktiviteti(aktiviteti) : createAktiviteti(aktiviteti);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setAktiviteti({ ...aktiviteti, [name]: value });
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
                        <MyTextInput type='text' placeholder='Emri Aktivitetit' name='emri' />
                        <MyTextInput type='text' placeholder='Pershkrimi' name='pershkrimi' />
                        <MyTextInput type='date' placeholder='DataMbajtjes' name='dataMbajtjes' />
                        <MySelectInput options={arr} placeholder='EmriSalles' name='emriSalles' />
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
