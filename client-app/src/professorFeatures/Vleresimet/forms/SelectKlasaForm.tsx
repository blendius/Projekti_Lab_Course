import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';

import MySelectInput from '../../../app/common/form/MySelectInput';
import { Klasa } from '../../../app/models/klasa';
import { useStore } from '../../../app/stores/store';



export default observer(function SelectKlasaForm() {

    const { profesoriStore, klasaStore, paraleljaStore, vleresimiStore } = useStore();
    const { closeAddKlasaForm, loading } = profesoriStore;
    const { klasatByVit } = klasaStore;
    const { getNxensitByKlasa, disabled } = vleresimiStore;

    const { getNumriParalelesById } = paraleljaStore;
    useEffect(() => {
        klasaStore.loadKlasat();
        paraleljaStore.loadParalelet();
    }, [klasaStore, paraleljaStore])


    const initialState = {
        EmriKlases: ''
    }
    const validationSchema = Yup.object({

        EmriKlases: Yup.string().required(),

    })


    // function handleFormSubmit(emriKlases: string) {
    //     return getNxensitByKlasa(emriKlases)

    // }

    function getEmriKlases(klasa: Klasa) {
        return klasa.viti + '-' + getNumriParalelesById(klasa.paraleljaId)
    }

    return (
        <Segment clearing>

            <Formik validationSchema={validationSchema}
                enableReinitialize initialValues={initialState}
                onSubmit={values => getNxensitByKlasa(values.EmriKlases)}>
                {({ handleSubmit }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MySelectInput options={
                            klasatByVit.map(klasa => (
                                {
                                    key: klasa.klasaId,
                                    text: getEmriKlases(klasa),
                                    value: getEmriKlases(klasa),
                                }
                            ))
                        }
                            placeholder='Klasa' name='EmriKlases' />
                        <Button disabled={disabled}
                            loading={loading} floated='right'  positive type='submit' content='Submit'  />
                        <Button onClick={closeAddKlasaForm} floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )

})