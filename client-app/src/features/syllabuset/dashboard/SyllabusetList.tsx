import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { Button, Segment, Table, TableBody, TableCell, TableRow } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';



export default observer(function SyllabusetList() {
    const { syllabusiStore } = useStore();
    const { deleteSyllabusi, syllabusetByDate, loading } = syllabusiStore;
    const [target, setTarget] = useState('');

    function handleLendaDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteSyllabusi(id);

    }

    return (
        <Segment.Group>
            <Segment className='lendetlist'>
                <Table celled compact >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Emri i Syllabusit</Table.HeaderCell>
                            <Table.HeaderCell>Linku i Syllabusit</Table.HeaderCell>
                            <Table.HeaderCell>Data E Shtimit</Table.HeaderCell>
                            <Table.HeaderCell>Shiko</Table.HeaderCell>
                            <Table.HeaderCell>Fshije</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <TableBody>
                        {syllabusetByDate.map(syllabuset => (
                            <TableRow key={syllabuset.syllabusiId}>
                                <TableCell >{syllabuset.emriSyllabusit}</TableCell>
                                <TableCell>{syllabuset.linkuISyllabusit}</TableCell>
                                <TableCell>{format(syllabuset.dataEKrijimit!, 'dd MMM yyyy ')}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => syllabusiStore.selectSyllabusi(syllabuset.syllabusiId)}
                                        floated='right'
                                        content='View'
                                        color='blue' />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        name={syllabuset.syllabusiId}
                                        loading={loading && target === syllabuset.syllabusiId}
                                        onClick={(e) => handleLendaDelete(e, syllabuset.syllabusiId)}
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