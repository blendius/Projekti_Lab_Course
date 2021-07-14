import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Card, Confirm, Image, List, Segment, Table, TableBody, TableCell } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function LaburatoriDetais() {
    const { laburatoriStore, lendaStore } = useStore();
    const { deleteLaburatori, loading } = laburatoriStore

    const { selectedLaburatori: laburatori, openForm, cancelSelectedLaburatori } = laburatoriStore;

    const [target, setTarget] = useState('');
    const [openConfirm, setOpenConfirm] = useState(false)

    function handleLaburatoriDelete( id: string) {
        deleteLaburatori(id)
    }

    if (!laburatori) return <LoadingComponent />

    return (
        <Segment>
            <Table celled compact>
                <Table.Header className='teDhena'>
                    <Table.Row>
                        <Table.HeaderCell >Lloji: </Table.HeaderCell>
                        <Table.HeaderCell >Lenda</Table.HeaderCell>
                        <Table.HeaderCell>Nr. Paisjeve</Table.HeaderCell>
                        <Table.HeaderCell>Data Krijimit</Table.HeaderCell>
                        <Table.HeaderCell>Edito</Table.HeaderCell>
                        <Table.HeaderCell>Fshije</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <TableBody>
                    <Table.Row>
                        <TableCell >{laburatori.lloji}</TableCell>
                        <TableCell> {lendaStore.getEmriLendestById(laburatori.lendaId)}</TableCell>
                        <TableCell> {laburatori.nrPaisjeve}</TableCell>
                        <TableCell>{laburatori.dataEKrijimit}</TableCell>
                        <TableCell>
                            <Button onClick={() => openForm(laburatori.id)} color='blue' content='Edit' className='detailsbtn' />
                        </TableCell>
                        <TableCell>
                            <Button name={laburatori.id}
                                loading={loading && target === laburatori.id}
                                onClick={() => setOpenConfirm(true)}
                                content='Fshije' color='google plus' />
                            <Confirm
                                content='A jeni i sigurt se doni ta fshini?'
                                open={openConfirm}
                                onCancel={() => setOpenConfirm(false)}
                                onConfirm={() => {
                                    handleLaburatoriDelete(laburatori.id);
                                    setOpenConfirm(false);
                                }}
                            />
                        </TableCell>
                    </Table.Row>
                </TableBody>


            </Table>
            <Button onClick={cancelSelectedLaburatori} color='grey' content='cancel' className='detailsbtn' />
        </Segment>

    )
})