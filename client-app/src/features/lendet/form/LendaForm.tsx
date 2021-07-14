import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';

import MyDataInput from '../../../app/common/form/MyDateInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { Lenda } from '../../../app/models/lenda';
import { useStore } from '../../../app/stores/store';



export default observer(function LendaForm() {
    const { lendaStore ,syllabusiStore} = useStore();
    const { selectedLenda, createLenda, updateLenda, closeForm, loading } = lendaStore;

    const { syllabusetByDate} = syllabusiStore;
    //const { id } = useParams<{ id: string }>();

    const initialState = selectedLenda ?? ({
        lendaId: '',
        emriLendes: '',
        pershkrimi: '',
        syllabusiId:'',
        dataEShtimit: null
    });
    useEffect(() => {
        syllabusiStore.loadSyllabuset();
    }, [syllabusiStore])
    const validationSchema = Yup.object({
        emriLendes: Yup.string().required('Emri i lendes eshte i nevojeshem').min(3),
        pershkrimi: Yup.string().required('pershkrimi i lendes eshte i nevojshem').min(3),
        dataEShtimit: Yup.string().required('dataEShtimit i lendes eshte i nevojshem').nullable(),
        syllabusiId: Yup.string().required('syllabusi i lendes eshte i nevojshem'),
    })
    const [lenda] = useState(initialState);
    // useEffect(() =>{
    //     if(id) loadLenda(lendaId).then(lenda=>setLenda(lenda!))
    // },[id,loadLenda])

    function handleFormSubmit(lenda: Lenda) {
        lenda.lendaId ? updateLenda(lenda) : createLenda(lenda, lenda.syllabusiId);
    }

    const options = [
        { key: 1, text: 'Syllabusi 1', value: 'test' },
        { key: 2, text: 'Syllabusi 2', value: 'Syllabusi 2' },
        { key: 3, text: 'Syllabusi 3', value: 'Syllabusi 3' },
    ]
    return (
        <Segment clearing>
            <Header content='Lendet Detajet' sub color='teal' />
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={lenda} 
            onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='emriLendes' placeholder='EmriLendes' />

                        <MyTextInput label='Pershkrimi' placeholder='Pershkrimi' name='pershkrimi' />
                        <MyDataInput
                            placeholderText='Data'
                            name='dataEShtimit'
                            dateFormat='MMMM d, yyyy '

                        />
                        <MySelectInput
                            label='Syllabusi'
                            options={
                                syllabusetByDate.map(syllabusi =>(
                                    {
                                    key: syllabusi.syllabusiId,
                                    text: syllabusi.emriSyllabusit,
                                    value: syllabusi.syllabusiId
                                    }
                                ))
                            }
                            placeholder='Syllabusi'
                            name='syllabusiId' />


                        <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />

                    </Form>
                )}
            </Formik>

        </Segment>
    )
})