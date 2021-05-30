import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';



export default observer(function LendaForm() {
    const { lendaStore } = useStore();
    const { selectedLenda, createLenda, updateLenda, closeForm } = lendaStore;
    //const { id } = useParams<{ id: string }>();

    const initialState = selectedLenda ?? ({
        lendaId: '',
        emriLendes: '',
        pershkrimi: '',
        syllabusi: '',
        dataEShtimit: ''
    });
    const [lenda, setLenda] = useState(initialState);

    // useEffect(()=>{
    //     if(id) loadLenda(id).then(lenda => setLenda(lenda!))
    // },[id,loadLenda]);

    function handleSubmit() {
        lenda.lendaId ? updateLenda(lenda) : createLenda(lenda);
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setLenda({ ...lenda, [name]: value })
    }
    //if(loadingInitial) return <LoadingComponent content='Lenda duke u ngarkuar....'/>

    const options = [
        { key: 1, text: 'Syllabusi 1', value: 1 },
        { key: 2, text: 'Syllabusi 2', value: 2 },
        { key: 3, text: 'Syllabusi 3', value: 3 },
    ]

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input label='Lenda' placeholder='EmriLendes' value={lenda.emriLendes} name='emriLendes' onChange={handleInputChange} />
                <Form.Input label='Pershkrimi' placeholder='Pershkrimi' value={lenda.pershkrimi} name='pershkrimi' onChange={handleInputChange} />
                <Form.Input label='Data' type='date' placeholder='Data' value={lenda.dataEShtimit} name='dataEShtimit' onChange={handleInputChange} />
                <Form.Select
                    fluid
                    label='Syllabusi'
                    options={options}
                    name='syllabusi'
                    placeholder='Syllabusi'
                />
                {/* <Form.Input placeholder='Syllabusi' value={lenda.syllabusi} name='syllabusi' onChange={handleInputChange} /> */}

                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />

            </Form>
        </Segment>
    )
})