import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Button, Confirm, Segment, Table, TableBody, TableCell } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function VlersimiDetais() {
    const { vleresimiStore, nxenesiStore } = useStore();
    const { deleteVlersimi, loading } = vleresimiStore

    useEffect(() => {
        nxenesiStore.loadNxenesit();
    }, [nxenesiStore])

    const { selectedVlersimi: vlersimi, openForm, cancelSelectedVlersimi } = vleresimiStore;

    const [target, setTarget] = useState('');
    const [openConfirm, setOpenConfirm] = useState(false)


    function handleVlersimiDelete(id: string) {
        deleteVlersimi(id)
    }

    if (!vlersimi) return <LoadingComponent />

    return (
        <Segment>
            <div className='details'>
                <Table celled compact>
                    <Table.Header className='teDhena'>
                        <Table.Row>
                            <Table.HeaderCell className='Emri'>Nxenesi: </Table.HeaderCell>
                            <Table.HeaderCell >Lenda</Table.HeaderCell>
                            <Table.HeaderCell>Nota</Table.HeaderCell>
                            <Table.HeaderCell>Gjysemvjetori</Table.HeaderCell>
                            <Table.HeaderCell>Viti</Table.HeaderCell>
                            <Table.HeaderCell>Data</Table.HeaderCell>
                            <Table.HeaderCell>Edito</Table.HeaderCell>
                            <Table.HeaderCell>Fshije</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                    <TableBody>
                        <Table.Row>
                            <TableCell >{nxenesiStore.getEmriNxenesitById(vlersimi.nxenesiId)}</TableCell>
                            <TableCell>{vlersimi.lenda}</TableCell>
                            <TableCell>{vlersimi.nota}</TableCell>
                            <TableCell>{vlersimi.gjysemvjetori}</TableCell>
                            <TableCell>{vlersimi.viti}</TableCell>
                            <TableCell>{vlersimi.dataRegjistrimit}</TableCell>
                            <TableCell>
                                <Button onClick={() => openForm(vlersimi.vleresimiId)} color='blue' content='Edit' className='detailsbtn' />
                            </TableCell>
                            <TableCell>
                                <Button name={vlersimi.vleresimiId}
                                    onClick={() => setOpenConfirm(true)}
                                    loading={loading && target === vlersimi.vleresimiId}
                                    content='Fshije' className='detailsbtn' color='red' />
                                <Confirm
                                    content='A jeni i sigurt se doni ta fshini?'
                                    open={openConfirm}
                                    onCancel={() => setOpenConfirm(false)}
                                    onConfirm={() => {
                                        handleVlersimiDelete(vlersimi.vleresimiId);
                                        setOpenConfirm(false);
                                    }}
                                />
                            </TableCell>
                        </Table.Row>
                    </TableBody>


                </Table>
                <Button onClick={cancelSelectedVlersimi} color='grey' content='cancel' className='detailsbtn' />

            </div>
        </Segment>
    )
})