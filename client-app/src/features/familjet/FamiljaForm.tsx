import { Formik, Form } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import MySelectInput from '../../app/common/form/MySelectInput';
import MyTextInput from '../../app/common/form/MyTextInput';
import { gjysemvjetoriOpt } from '../../app/common/form/options';
import { Familja } from '../../app/models/familja';
import { useStore } from '../../app/stores/store';



export default observer(function FamiljaForm() {

    const { familjaStore, prindiStore, nxenesiStore } = useStore();
    const { selectedFamilja, closeForm, loading, updateFamilja, createFamilja } = familjaStore;
    const { prindiRegistry, prinderitByName } = prindiStore;
    const { nxenesiRegistry, nxenesitByDate } = nxenesiStore;

    useEffect(() => {
        prindiStore.loadPrinderit();
    }, [prindiStore])

    useEffect(() => {
        nxenesiStore.loadNxenesit();
    }, [nxenesiStore])

    const initialState = selectedFamilja ?? {
        familjaId: '',
        prindiId: '',
        nxenesiId: ''
    }
    const validationSchema = Yup.object({
        prindiId: Yup.string().required('Prindi duhet te zgjedhet!'),
        nxenesiId: Yup.string().required('Nxenesi duhet te zgjedhet!'),
    })

    const [familja, setFamilja] = useState(initialState);

    function handleFormSubmit(familja: Familja) {
        familja.familjaId ? updateFamilja(familja, familja.prindiId, familja.nxenesiId) : createFamilja(familja, familja.prindiId, familja.nxenesiId);
    }
    // console.log(nxenesitByDate)

    return (
        <Segment clearing>
            <Formik validationSchema={validationSchema}
                enableReinitialize initialValues={familja}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MySelectInput options=
                            {
                                prinderitByName.map(prindi => (
                                    {
                                        key: prindi.id,
                                        text: prindi.displayName,
                                        value: prindi.id,
                                    }
                                ))
                            } placeholder='Prindi' name='prindiId' />
                        <MySelectInput options=
                            {
                                nxenesitByDate.map(nxenesi => (
                                    {
                                        key: nxenesi.id,
                                        text: nxenesi.email,
                                        value: nxenesi.id
                                    }
                                ))
                            } placeholder='Nxenesi' name='nxenesiId' />

                        <Button disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )

})