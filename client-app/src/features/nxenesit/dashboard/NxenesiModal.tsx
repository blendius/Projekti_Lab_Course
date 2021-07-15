import axios from 'axios';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { Button, Form, Input, Modal } from 'semantic-ui-react';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { Nxenesi } from '../../../app/models/nxenesi';
import { useStore } from '../../../app/stores/store';
import { history } from '../../../index';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  nxenesi: any;
}


const options_Class = [
  { key: "10-1", text: "10-1", value: "10-1" },
  { key: "10-2", text: "10-2", value: "10-2" },
  { key: "11-1", text: "11-1", value: "11-1" },
  { key: "11-2", text: "11-2", value: "11-2" },
  { key: "12-1", text: "12-1", value: "12-1" },
  { key: "12-2", text: "12-2", value: "12-2" },
];
const options_Registration = [
  { key: "1", text: 2018, value: 2018 },
  { key: "2", text: 2019, value: 2019 },
  { key: "3", text: 2020, value: 2020 },
];

function NxenesiModal(props: ModalProps) {
  const {nxenesiStore: {selectedNxenesi,updateNxenesin, loading, closeForm} } = useStore();
  const { open, setOpen, nxenesi } = props;
  const [currentData, setCurrentData] = useState({
    ...nxenesi,
    // currentPassword: "",
    // newPassword: "",
    // confirmPassword: "",
    dateOfBirth: nxenesi?.dateOfBirth ? new Date(nxenesi.dateOfBirth) : "",
  });
  useEffect(() => {
    resetCurrentData()
  },[nxenesi])

  function resetCurrentData() {
    setCurrentData({
      ...nxenesi,
      // currentPassword: "",
      // newPassword: "",
      // confirmPassword: "",
      dateOfBirth: nxenesi?.dateOfBirth ? new Date(nxenesi.dateOfBirth) : "",
    });
  }
  const initialState = selectedNxenesi ?? {
      id: '',
      fullName: '',
      parentName: '',
      email: '',
      password: '',
      dateOfBirth: '',
      yearOfRegistration: 0,
      class: '',
      phoneNumber: ''
};
  const [errors, setErrors] = useState({nameError: false, parentError: false, 
                                    emailError: false, phoneError: false,
                                    dateError: false, yearError: false, classError: false})
  const [submitClicked, setSubmitClicked] = useState(false)

  const [njoftimi, setNjoftimi] = useState(initialState);

  useEffect(()=>{
    if(submitClicked){
      setErrors({nameError: !nxenesi.fullName.trim(),
        parentError: !nxenesi.parentName.trim(),
        emailError: !nxenesi.email.trim(),
        dateError: !nxenesi.dateOfBirth,
        yearError: !nxenesi.yearOfRegistration,
        phoneError: !nxenesi.phoneNumber.trim(),
        classError: !nxenesi.class.trim()
        })
    }
  },[njoftimi])

  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setCurrentData({ ...currentData, [name]: value });
    //setCurrentData((prevState) => ({...prevState, [name]: value}))
  }
  function setSelectValues(selectName: any, event: any) {
    const { innerText } = event.target;
    const value =
      selectName === "yearOfRegistration" ? parseInt(innerText) : innerText;
    setCurrentData({ ...currentData, [selectName]: value });
  }
  function onDateChange(event: any, data: any) {
    setCurrentData({
      ...currentData,
      dateOfBirth: data.value,
    });
  }

  function handleSubmit(nxenesi: Nxenesi) {
    setSubmitClicked(true)
        setErrors({nameError: !nxenesi.fullName.trim(),
            parentError: !nxenesi.parentName.trim(),
            emailError: !nxenesi.email.trim(),
            dateError: !nxenesi.dateOfBirth,
            yearError: !nxenesi.yearOfRegistration,
            phoneError: !nxenesi.phoneNumber.trim(),
            classError: !nxenesi.class.trim()
            })
        if(nxenesi.fullName.trim() && nxenesi.parentName.trim() 
        && nxenesi.phoneNumber.trim() && nxenesi.dateOfBirth 
        && nxenesi.yearOfRegistration && nxenesi.class.trim() && nxenesi.email.trim())
            updateNxenesin(currentData);

}
  return (
    <Modal
      onClose={() => {
        setOpen(false);
        resetCurrentData();
      }}
      open={open}
  
      autoComplete="off"
    >
    {/* <Formik
            enableReinitialize initialValues={nxenesi}
            onSubmit={values => handleFormSubmit(values)}>
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name='fullName' placeholder='Emri dhe mbiemri' />
                    <MyTextInput name='parentName' placeholder='Emri i prindit' />
                    <MyTextInput name='phoneNumber' placeholder='Numri i telefonit' />
                    <MySelectInput options={options_Class} name='class' placeholder='Klasa' />
                    <MySelectInput options={options_Registration} name='yearOfRegistration' placeholder='Viti i regjistrimit' />
                    <MyTextInput name='dateOfBirth' placeholder='Datelindja' type='date' />
                    <MyTextInput name='email' placeholder='Email' />
                       <Modal.Actions>
                    <Button disabled={isSubmitting || !dirty}
                        loading={loading}   content="Edito"
                        labelPosition="right"
                        icon="checkmark"
                        type="submit"
                        onClick={() => {
                          updateNxenesin(currentData)
                          setOpen(false);
                          window.location.reload();
                          history.push("/nxenesiPage/Profili");
                        }} />
                    <Button onClick={() => {
                           setOpen(false) }} color="black"> Anulo </Button>
                            </Modal.Actions>
                </Form>
               
            )}
        </Formik>
        </Modal.Description>
      </Modal.Content> */}
    
      <Modal.Header>Edito te dhenat</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Form>
            <Form.Group widths="equal">
              {
                  errors.nameError && <span style={{color:"red"}}>Emri duhet te plotesohet!</span>
              }
              <Form.Input
                label="Emri dhe mbiemri"
                placeholder="Emri"
                value={currentData.fullName}
                name="fullName"
                onChange={(event) => handleInputChange(event)}
              />
              {
                  errors.parentError && <span style={{color:"red"}}>Emri i prindit duhet te plotesohet!</span>
              }
              <Form.Input
                label="Emri i prindit"
                placeholder="Prindi"
                value={currentData.parentName}
                name="parentName"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              {
                  errors.emailError && <span style={{color:"red"}}>Email duhet te plotesohet!</span>
              }
              <Form.Input
                label="Email"
                placeholder="joe@schmoe.com"
                value={currentData.email}
                name="email"
                onChange={handleInputChange}
              />

              <Form.Field>
                {
                    errors.phoneError && <span style={{color:"red"}}>Numri i telefonit duhet te plotesohet!</span>
                }
                <label>Numri i telefonit</label>
                <Input
                  placeholder="(xxx)-xxx-xxx"
                  value={currentData.phoneNumber}
                  name="phoneNumber"
                  onChange={handleInputChange}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
            {
                    errors.classError && <span style={{color:"red"}}>Klasa duhet te plotesohet!</span>
                }
              <Form.Field>
                <label>Klasa</label>
                <Form.Select
                  options={options_Class}
                  placeholder="Klasa"
                  defaultValue={currentData.class}
                  name="class"
                  onChange={(e) => setSelectValues("class", e)}
                />
              </Form.Field>
              {
                    errors.yearError && <span style={{color:"red"}}>Viti i regjistrimit duhet te plotesohet!</span>
                }
              <Form.Field>
                <label>Viti i regjistrimit</label>
                <Form.Select
                  options={options_Registration}
                  placeholder="2020"
                  defaultValue={currentData.yearOfRegistration}
                  name="yearOfRegistration"
                  onChange={(e) => setSelectValues("yearOfRegistration", e)}
                />
              </Form.Field>
              {
                    errors.dateError && <span style={{color:"red"}}>Data duhet te plotesohet!</span>
                }
              <Form.Field>
                <label>Data e lindjes</label>

                <SemanticDatepicker
                  value={currentData.dateOfBirth}
                  onChange={onDateChange}
                />
              </Form.Field>
            </Form.Group> 




             {/* <Form.Group widths="equal">
              <Form.Field>
                <label>Passwordi aktual</label>
                <Input
                  type="password"
                  placeholder="Passwordi aktual"
                  value={currentData.currentPassword}
                  name="currentPassword"
                  onChange={handleInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Passwordi i ri</label>
                <Input
                  type="password"
                  placeholder="Passwordi i ri"
                  value={currentData.newPassword}
                  name="newPassword"
                  onChange={handleInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Konfirmo passwordin</label>
                <Input
                  type="password"
                  placeholder="Konfirmo passwordin"
                  value={currentData.confirmPassword}
                  name="confirmPassword"
                  onChange={handleInputChange}
                />
              </Form.Field> 
             </Form.Group>  */}
           </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="black"
          onClick={() => {
            setOpen(false);
            resetCurrentData();
          }}
        >
          Anulo
        </Button>
        <Button
          content="Edito"
          labelPosition="right"
          icon="checkmark"
          type="submit"
          onClick={() => {
            updateNxenesin(currentData)
            setOpen(false);
            window.location.reload();
            history.push("/nxenesiPage/Profili");
            window.location.reload();
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default NxenesiModal;
