import React, { ChangeEvent, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, Form, Modal } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


const options_Class = [
    { key: "10-1", text: "10-1", value: "10-1" },
    { key: "10-2", text: "10-2", value: "10-2" },
    { key: "11-1", text: "11-1", value: "11-1" },
    { key: "11-2", text: "11-2", value: "11-2" },
    { key: "12-1", text: "12-1", value: "12-1" },
    { key: "12-2", text: "12-2", value: "12-2" },
];

export default observer(function LibriForm() {
    const {libriStore, lendaStore} = useStore();
    const {selectedLibri, closeForm, createLibrin, updateLibrin, loading, editMode} = libriStore;
    const { lendaRegistry, lendetByDate } = lendaStore;

    const initialState:any = selectedLibri ?? {
        id: '',
        titulli: '',
        autori: '',
        linku: '',
        lendaString: '',
        EmriLendes: '',
        klasa: '',
        pershkrimi: ''
    }
    const [errors, setErrors] = useState({pershkrimiError: false, titulliError: false, autoriError: false, linkuError: false, lendaError: false, klasaError: false})
    const [submitClicked, setSubmitClicked] = useState(false)
    const [libri, setLibrin] = useState(initialState);

    useEffect(()=>{
        if(submitClicked){
            setErrors({pershkrimiError: !libri.pershkrimi.trim(),
                titulliError: !libri.titulli.trim(),
                autoriError: !libri.autori.trim(),
                linkuError: !libri.linku.trim(),
                lendaError: !libri.lendaString.trim(),
                klasaError: !libri.klasa.trim(),
             })
        }
    },[libri])

 
    if(selectedLibri?.lendaString) {
        initialState.lendaString = selectedLibri?.lendaString
    }
    

    useEffect(() => {
        setLibrin({...libri, lendaString: libri.EmriLendes})
    },[libri.EmriLendes])

    function handleSubmit() {

        setSubmitClicked(true)
        setErrors({pershkrimiError: !libri.pershkrimi.trim(),
            titulliError: !libri.titulli.trim(),
            autoriError: !libri.autori.trim(),
            linkuError: !libri.linku.trim(),
            lendaError: !libri.lendaString.trim(),
            klasaError: !libri.klasa.trim(),
         })
        if(libri.pershkrimi.trim() && libri.titulli.trim() && libri.autori.trim() && libri.linku.trim() && libri.lendaString.trim() && libri.klasa.trim()){
        if(libri.id) {
            libri.lendaString = libri.lendaString  || selectedLibri?.lendaString || '';
        }
        libri.id ? updateLibrin(libri) : createLibrin(libri, libri.EmriLendes);
    }}

    function handleInputChange(event: any) {
        const {name, value} = event.target;
        setLibrin({...libri, [name]: value})

    }
    function setSelectValues(selectName: any, event: any) {
        const { innerText } = event.target;
        setLibrin({ ...libri, [selectName]: innerText });
    }
    const {id, ...otherData } = libri
    console.log("otherData:", otherData)
    
    const disabledSubmit = Object.keys(otherData).some(field => 
        field !== "lenda" && (field == "lendaString" && !selectedLibri?.lendaString && !libri[field]) &&
        (field!=="lendaString" && !libri[field] || libri[field].trim() == ""))
    
    return (
        // <Segment clearing>
    <Modal
        onClose={() => {
          closeForm();
        }}
        open={editMode}
        autoComplete="off"
      >
        <Modal.Header>Shto/Edito te dhenat</Modal.Header>
        <Modal.Content image>
          <Modal.Description>

            <Form onSubmit={handleSubmit} autoComplete='off'>
                {
                    errors.titulliError && <span style={{color:"red"}}>Titulli duhet te plotesohet!</span>
                }
                <Form.Input placeholder='Titulli' value={libri.titulli} name='titulli' onChange={handleInputChange}/>
                {
                    errors.autoriError && <span style={{color:"red"}}>Autori duhet te plotesohet!</span>
                }
                <Form.Input placeholder='Autori' value={libri.autori} name='autori' onChange={handleInputChange}/>
                {
                    errors.klasaError && <span style={{color:"red"}}>Klasa duhet te plotesohet!</span>
                }
                <Form.Select 
                    options={options_Class} 
                    placeholder="Klasa" 
                    value={libri.klasa} 
                    name='klasa' 
                    onChange={(e) => setSelectValues("klasa", e)}
                />
                {
                    errors.lendaError && <span style={{color:"red"}}>Lenda duhet te plotesohet!</span>
                }
                <Form.Select value = {libri.lendaString} 
                            options=
                            {
                                lendetByDate.map(lenda => (
                                    {
                                    key:lenda.lendaId,
                                    text:lenda.emriLendes,
                                    value:lenda.emriLendes}
                                ))
                            } placeholder='Lenda' name='EmriLendes' 
                            onChange={(e) => setSelectValues("EmriLendes", e)}
                />
                {
                    errors.pershkrimiError && <span style={{color:"red"}}>Pershkrimi duhet te plotesohet!</span>
                }
                <Form.TextArea placeholder='Pershkrimi' value={libri.pershkrimi} name='pershkrimi' onChange={handleInputChange}/>
                {
                    errors.linkuError && <span style={{color:"red"}}>Linku duhet te plotesohet!</span>
                }
                <Form.Input placeholder='Linku' value={libri.linku} name='linku' onChange={handleInputChange}/>
              
                <Button disabled={disabledSubmit}
                    loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form> 
                 {/* </Segment> */}
        </Modal.Description>
      </Modal.Content>
      </Modal>
     
    )
})