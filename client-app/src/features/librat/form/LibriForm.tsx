import { lutimes } from "fs";
import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { useEffect } from "react";
import { Button, Form, Modal, Segment } from "semantic-ui-react";
import { Libri } from "../../../app/models/libri";
import { useStore } from "../../../app/stores/store";

const options_Class = [
    { key: "X1", text: "X/1", value: "X/1" },
    { key: "X2", text: "X/2", value: "X/2" },
    { key: "XI1", text: "XI/1", value: "XI/1" },
    { key: "XI2", text: "XI/2", value: "XI/2" },
    { key: "XII1", text: "XII/1", value: "XII/1" },
    { key: "XII2", text: "XII/2", value: "XII/2" },
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
    if(selectedLibri?.lendaString) {
        initialState.lendaString = selectedLibri?.lendaString
    }
    const [libri, setLibrin] = useState(initialState);

    useEffect(() => {
        setLibrin({...libri, lendaString: libri.EmriLendes})
    },[libri.EmriLendes])

    function handleSubmit() {
        if(libri.id) {
            libri.lendaString = libri.lendaString  || selectedLibri?.lendaString || '';
        }
        libri.id ? updateLibrin(libri) : createLibrin(libri, libri.EmriLendes);
    }

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
        //<Segment clearing>
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
            <Form autoComplete='off'>
                <Form.Input placeholder='Titulli' value={libri.titulli} name='titulli' onChange={handleInputChange}/>
                <Form.Input placeholder='Autori' value={libri.autori} name='autori' onChange={handleInputChange}/>
                <Form.Select 
                    options={options_Class} 
                    placeholder="Klasa" 
                    value={libri.klasa} 
                    name='klasa' 
                    onChange={(e) => setSelectValues("klasa", e)}
                />
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
                <Form.TextArea placeholder='Pershkrimi' value={libri.pershkrimi} name='pershkrimi' onChange={handleInputChange}/>
                <Form.Input placeholder='Linku' value={libri.linku} name='linku' onChange={handleInputChange}/>
             
                <Button disabled={disabledSubmit}
                    loading={loading} floated='right' positive type='submit' content='Submit' onClick={()=>{closeForm();handleSubmit();}}/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        {/* //</Segment> */}
        </Modal.Description>
      </Modal.Content>
      </Modal>
    )
})