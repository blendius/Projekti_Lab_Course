import { Formik, Form } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { FeedbackToNxenesi } from '../../../app/models/feedbackToNxenesi';
import { useStore } from '../../../app/stores/store';



export default observer(function FeedbackForm() {

    const { feedbackStore, profesoriStore, nxenesiStore } = useStore();
    const { selectedFeedback, closeForm, loading, createFeedback, cancelSelectedFeedback } = feedbackStore;
    const { nxenesitByDate } = nxenesiStore;


    useEffect(() => {
        nxenesiStore.loadNxenesit();
    }, [])

    const initialState = selectedFeedback ?? {
        feedbackID: '',
        profesoriId: '',
        nxenesiEmail: '',
        subject: '',
        message: '',
        messageSentDate: '',
        rating: 0,
        isReply : false,
    }
    const validationSchema = Yup.object({
        subject: Yup.string().required('Subjekti duhet te plotesohet !'),
        message: Yup.string().required('Mesazhi duhet te plotesohet!'),
        dataEDergimit: Yup.string().required('Data duhet te plotesohet!'),
        nxenesiEmail: Yup.string().email('Shkruani nje email valide')
    })

    const [feedback, setKontakti] = useState(initialState);

    function handleFormSubmit(feedback: FeedbackToNxenesi) {
        console.log("here")
        createFeedback(feedback);
    }

    return (
        <Segment clearing>
            <Formik validationSchema={validationSchema}
                enableReinitialize initialValues={feedback}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MySelectInput options=
                            {
                                nxenesitByDate.map(nxenesi => (
                                    {
                                        key: nxenesi.id,
                                        text: nxenesi.fullName,
                                        value: nxenesi.email
                                    }
                                ))
                            } placeholder='Nxenesi' name='nxenesiEmail' />
                        <MyTextInput type='text' placeholder='Subjekti' name='subject' />
                        <MyTextArea rows={4} type='text' placeholder='Mesazhi' name='message' />
                        {/* <MyTextInput type='date' placeholder='Data e Dërgimit' name='dataEDergimit' /> */}
                        <Button 
                            loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button onClick={cancelSelectedFeedback} floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )

})