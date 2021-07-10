import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { Button, Segment, Table, TableBody, TableCell, TableRow } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';



export default observer(function LendetList() {
    const { lendaStore,syllabusiStore } = useStore();
    const { deleteLenda, lendetByDate, loading } = lendaStore;
    const { getSyllabusiEmri} = syllabusiStore;

    const [target, setTarget] = useState('');

    function handleLendaDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteLenda(id);

    }

    return (
        <Segment.Group>
            <Segment className='lendetlist'>
                <Table celled compact >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell >Emri i Lendes</Table.HeaderCell>
                            <Table.HeaderCell>Pershkrimi i Lendes</Table.HeaderCell>
                            <Table.HeaderCell>Syllabusi</Table.HeaderCell>
                            <Table.HeaderCell>Data E Shtimit</Table.HeaderCell>
                            <Table.HeaderCell>Shiko</Table.HeaderCell>
                            <Table.HeaderCell>Fshije</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <TableBody>
                        {lendetByDate.map(lendet => (
                            <TableRow key={lendet.lendaId}>
                                <TableCell >{lendet.emriLendes}</TableCell>
                                <TableCell>{lendet.pershkrimi}</TableCell>
                                <TableCell>{getSyllabusiEmri(lendet.syllabusiId)}</TableCell>
                                <TableCell>{format(lendet.dataEShtimit!, 'dd MMM yyyy ')}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => lendaStore.selectLenda(lendet.lendaId)}
                                        floated='right'
                                        content='View'
                                        color='blue' />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        name={lendet.lendaId}
                                        loading={loading && target === lendet.lendaId}
                                        onClick={(e) => handleLendaDelete(e, lendet.lendaId)}
                                        floated='right'
                                        content='Delete' color='red' />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Segment>

        </Segment.Group>

    )

})