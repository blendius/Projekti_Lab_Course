import { Formik, Form } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { FeedbackToNxenesi } from '../../app/models/feedbackToNxenesi';
import { useStore } from '../../app/stores/store';




export default observer(function FeedbackForm() {

    const { feedbackStore } = useStore();
    const { selectedFeedback, closeForm, loading, createFeedback } = feedbackStore;

    const initialState = selectedFeedback ?? {
        feedbackId: '',
        nxenesiEmail: '',
        subject: '',
        message: '',
        dataEDergimit: '',

    }
    const validationSchema = Yup.object({
        subject: Yup.string().required('Subjekti duhet te plotesohet !'),
        message: Yup.string().required('Mesazhi duhet te plotesohet!'),
        dataEDergimit: Yup.string().required('Data duhet te plotesohet!'),
        nxenesiEmail: Yup.string().required("Email duhet te plotesohet!").email('Shkruani nje email valide')
    })


    function handleFormSubmit(feedback: FeedbackToNxenesi) {
        createFeedback(feedback);
    }

    return (
        <Segment clearing>
            <Formik validationSchema={validationSchema}
                enableReinitialize initialValues={initialState}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput type='text' name='nxenesiEmail' placeholder='Email e Nxenesit'></MyTextInput>
                        <MyTextInput type='text' placeholder='Subjekti' name='subject' />
                        <MyTextInput type='text' placeholder='Mesazhi' name='message' />
                        <MyTextInput type='date' placeholder='Data e Dergimit' name='dataEDergimit' />
                        <Button disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )

})