import { Formik, Form } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Rating, Segment, TextArea } from 'semantic-ui-react';
import * as Yup from 'yup';
import MySelectInput from '../../app/common/form/MySelectInput';
import MyTextInput from '../../app/common/form/MyTextInput';
import { FeedbackToNxenesi } from '../../app/models/feedbackToNxenesi';
import { useStore } from '../../app/stores/store';




export default observer(function FeedbackForm() {

    const { feedbackStore, nxenesiStore ,profesoriStore} = useStore();
    const { selectedFeedback, closeForm, loading, createFeedback } = feedbackStore;
    
    const { nxenesitByDate } = nxenesiStore;


    useEffect(() => {
        nxenesiStore.loadNxenesit();
    }, [])
    const initialState = selectedFeedback ?? {

        feedbackID: '',
        nxenesiEmail: '',
        subject: '',
        message: '',
        messageSentDate: '',
        rating: 0,
        profesoriId : ''
    }
    const validationSchema = Yup.object({
        subject: Yup.string().required('Subjekti duhet te plotesohet !'),
        message: Yup.string().required('Mesazhi duhet te plotesohet!'),
        messageSentDate: Yup.string().required('Data duhet te plotesohet!'),
        nxenesiEmail: Yup.string().required("Email duhet te plotesohet!").email('Shkruani nje email valide'),
        rating: Yup.number().required("Vlersimi i nevojshem")
    })


    function handleFormSubmit(feedback: FeedbackToNxenesi) {
        createFeedback(feedback);
    }

    return (
        <Segment clearing>
            <Formik validationSchema={validationSchema}
                enableReinitialize initialValues={initialState}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isSubmitting, dirty }) => (
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
                        <MyTextInput type='text' placeholder='Titulli' name='subject' />
                        <TextArea type='text' placeholder='Mesazhi' name='message' /><br /><br/>
                        <label>Vlersimi </label>
                        <Rating icon='star' defaultRating={5} maxRating={5} name='vlersimi'  />
                        {/* <MyTextInput type='date' placeholder='Data e Dergimit' name='messageSentDate' /> */}
                        <Button disabled={isSubmitting || !dirty }
                            loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )

})