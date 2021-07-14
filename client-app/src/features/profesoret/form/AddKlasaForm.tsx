import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';

import MySelectInput from '../../../app/common/form/MySelectInput';
import { Klasa } from '../../../app/models/klasa';
import { ProfKlasa } from '../../../app/models/profKlasa';
import { useStore } from '../../../app/stores/store';



export default observer(function AddKlasaForm() {

    const { profesoriStore, klasaStore, paraleljaStore } = useStore();
    const { selectedProfessor, closeAddKlasaForm, loading, createProfKlasa } = profesoriStore;
    const { klasatByVit } = klasaStore;

    const { getNumriParalelesById } = paraleljaStore;
    useEffect(() => {
        klasaStore.loadKlasat();
        paraleljaStore.loadParalelet();
    }, [klasaStore, paraleljaStore])


    const initialState = {
        
        profId: '',
        klasaId: ''
    }
    const validationSchema = Yup.object({

        klasaId: Yup.string().required(),

    })

    const [profesori] = useState(initialState);

    function handleFormSubmit(profesoriKlasa: ProfKlasa) {
        profesoriKlasa.profId = selectedProfessor?.id
        createProfKlasa(profesoriKlasa, profesoriKlasa.profId, profesoriKlasa.klasaId);

    }

    function EmriKlases(klasa:Klasa){
        return klasa.viti +'/'+  getNumriParalelesById(klasa.paraleljaId)
    }

    return (
    <Segment clearing>

        <Formik validationSchema={validationSchema}
            enableReinitialize initialValues={initialState}
            onSubmit={values => handleFormSubmit(values)}>
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MySelectInput options={ 
                         klasatByVit.map(klasa => (
                            {
                                key: klasa.klasaId,
                                text: EmriKlases(klasa),
                                value: klasa.klasaId
                            }
                        ))
                    }
                        placeholder='Klasa' name='klasaId' />
                    <Button disabled={isSubmitting || !dirty || !isValid}
                        loading={loading} floated='right' positive type='submit' content='Submit' />
                </Form>
            )}
        </Formik>

    </Segment>
)

})