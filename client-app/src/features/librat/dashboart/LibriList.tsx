import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Confirm, Item, Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer(function LibriList() {
    const [target, setTarget] = useState('');
    const [openConfirm, setOpenConfirm] = useState(false)
    const {libriStore} = useStore();
    const {deleteLibrin, libriByDate, loading, openForm} = libriStore;
    
    function handleLibriDelete(e: any, id: string) {
        setTarget(e.target.name);
        deleteLibrin(id);
    }
    console.log('libriByDate:',libriByDate)
    return(
    <Segment>
         <Table celled compact >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell >Titulli</Table.HeaderCell>
                            <Table.HeaderCell >Autori</Table.HeaderCell>
                            <Table.HeaderCell >Klasa</Table.HeaderCell>
                            <Table.HeaderCell >Lenda</Table.HeaderCell>
                            <Table.HeaderCell >Linku</Table.HeaderCell>
                            <Table.HeaderCell >Pershkrimi</Table.HeaderCell>
                            <Table.HeaderCell>Edito</Table.HeaderCell>
                            <Table.HeaderCell>Fshije</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <TableBody>
                        {/* libriByDate.filter(item => item.klasa === nxenesi.klasa).map() */}
                        {libriByDate.map(libri => (
                            <TableRow key={libri.id}>
                                <TableCell >{libri.titulli}</TableCell>
                                <TableCell >{libri.autori}</TableCell>
                                <TableCell >{libri.klasa}</TableCell>
                                <TableCell >{libri.lendaString}</TableCell>
                                <TableCell >{libri.linku}</TableCell>
                                <TableCell >{libri.pershkrimi}</TableCell>
                                <TableCell>
                                    <Button class="ui labeled icon button"
                                        onClick={() => openForm(libri.id)}
                                        floated='right'
                                        content='Edito'
                                        icon='edit'
                                        color='blue' />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        name={libri.id}
                                        loading={loading && target === libri.id} 
                                        onClick={(e) => setOpenConfirm(true)} 
                                        floated='right' 
                                        content='Fshij' 
                                        icon='trash'
                                        color='red' />
                                        <Confirm 
                                            content='A jeni i sigurt se doni ta fshini?'
                                            open={openConfirm} 
                                            onCancel={() => setOpenConfirm(false)}
                                            onConfirm={(e) => {
                                                handleLibriDelete(e, libri.id); 
                                                setOpenConfirm(false);
                                            }} 
                                        />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            {/* <Item.Group divided>
                {libriByDate.map(libri => (
                    <Item key={libri.id}>
                        <Item.Content>
                            <Item.Header as='a'>Libri "{libri.titulli}" i shkruar nga {libri.autori}</Item.Header>
                            <Item.Description>Linku: {libri.linku}</Item.Description>
                            <Item.Extra>
                                <Button onClick={() => libriStore.selectLibri(libri.id)} floated='right' content='Shiko detajet' color='blue'/>
                                <Button  
                                    name={libri.id}
                                    loading={loading && target === libri.id} 
                                    onClick={(e) => setOpenConfirm(true)} 
                                    floated='right' 
                                    content='Fshij' 
                                    color='red' />
                                    <Confirm 
                                        content='A jeni i sigurt se doni ta fshini?'
                                        open={openConfirm} 
                                        onCancel={() => setOpenConfirm(false)}
                                        onConfirm={(e) => {
                                            handleLibriDelete(e, libri.id); 
                                            setOpenConfirm(false);
                                        }}
                                />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group> */}
        </Segment>
    )
})