import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import MyDataInput from '../../../app/common/form/MyDateInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { Syllabusi } from '../../../app/models/syllabusi';
import { useStore } from '../../../app/stores/store';



export default observer(function SyllabusiForm() {
    const { syllabusiStore } = useStore();
    const { selectedSyllabusi, createSyllabusi, updateSyllabusi, closeForm, loading } = syllabusiStore;
    //const { id } = useParams<{ id: string }>();

    const initialState = selectedSyllabusi ?? ({
        syllabusiId: '',
        emriSyllabusit: '',
        linkuISyllabusit: '',
        dataEKrijimit: null,

    });


    const validationSchema = Yup.object({
        emriSyllabusit: Yup.string().required('Emri i lendes eshte i nevojeshem').min(3),
        linkuISyllabusit: Yup.string().required('pershkrimi i lendes eshte i nevojshem').min(3),
        dataEKrijimit: Yup.string().required('dataEShtimit i lendes eshte i nevojshem'),
    })
    const [syllabusi] = useState(initialState);
    // useEffect(() =>{
    //     if(id) loadLenda(syllabusiID).then(syllabusi=>setLenda(syllabusi!))
    // },[id,loadLenda])

    function handleFormSubmit(syllabusi: Syllabusi) {
        syllabusi.syllabusiId ? updateSyllabusi(syllabusi) : createSyllabusi(syllabusi);
    }

   
    return (
        <Segment clearing>
            <Header content='Syllabusi Detajet' sub color='teal' />
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={syllabusi} onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='emriSyllabusit' placeholder='Emri Syllabusit' />
                        <MyTextInput label='linkuSyllabusit' placeholder='Linku i Syllabusit' name='linkuISyllabusit' />
                        <MyDataInput
                            placeholderText='Data'
                            name='dataEKrijimit'
                            dateFormat='MMMM d, yyyy '
                        />


                        <Button disabled={isSubmitting || !dirty || !isValid } loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />

                    </Form>
                )}
            </Formik>

        </Segment>
    )
})