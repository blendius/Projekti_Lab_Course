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

export default observer(function OrariiForm() {
    const { pajisjetStore } = useStore();
    const { laburatoriStore } = useStore();
    const { laburatoriByDate, loadLaburatoret } = laburatoriStore;

    const { selectedPajisja, closeForm, createPajisja, updatePajisja, loading } = pajisjetStore;

    const initialState = selectedPajisja ?? {
        pajisjaId: '',
        kodiProduktit: '',
        emriPajisjes: '',
        dataEShtimit: '',
        laburatioriId: '',
    }

    useEffect(() => {
        loadLaburatoret();
    }, []);
    const [pajisja, setPajisja] = useState(initialState);
    var lab = laburatoriByDate;
    var arr: any = [];
    var len = laburatoriByDate.length;
    for (var i = 0; i < len; i++) {
        arr.push({
            text: lab[i].id,
            value: lab[i].id,
        });
    }
    function handleSubmit(pajisja: Pajisja) {
        pajisja.pajisjaId ? updatePajisja(pajisja) : createPajisja(pajisja, pajisja.laburatioriId);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setPajisja({ ...pajisja, [name]: value });
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
                        <MyTextInput type='text' placeholder='Kodi Produktit' name='kodiProduktit' />
                        <MyTextInput type='text' placeholder='Emri Produktit' name='emriPajisjes' />
                        <MyTextInput type='date' placeholder='Data e shtimit' name='dataEShtimit' />
                        <MySelectInput options={arr} placeholder='LaburatioriId' name='laburatioriId' />
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
