import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Button, Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ParaleljaList() {
    const { paraleljaStore } = useStore();
    const { deleteParalelja, loading, paraleletByNumri } = paraleljaStore;
    const [target, setTarget] = useState('');

    function handleParaleljaDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteParalelja(id);
    }

    return (
        <Segment.Group>
            <Segment className='pareleletList'>
                <Table celled compact >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell >Paralelja</Table.HeaderCell>
                            <Table.HeaderCell >Kapaciteti Maksimal</Table.HeaderCell>
                            <Table.HeaderCell >Kapaciteti Minimal</Table.HeaderCell>
                            <Table.HeaderCell>Shiko</Table.HeaderCell>
                            <Table.HeaderCell>Fshije</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <TableBody>
                        {paraleletByNumri.map(paralelet => (
                            <TableRow key={paralelet.numri}>
                                <TableCell >{paralelet.numri}</TableCell>
                                <TableCell >{paralelet.kapacitetiMax}</TableCell>
                                <TableCell >{paralelet.kapacitetiMin}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => paraleljaStore.selectParalelja(paralelet.paraleljaId)}
                                        floated='right'
                                        content='Shiko'
                                        color='blue' />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        name={paralelet.paraleljaId}
                                        loading={loading && target === paralelet.paraleljaId}
                                        onClick={(e) => handleParaleljaDelete(e, paralelet.paraleljaId)}
                                        floated='right'
                                        content='Fshij' color='red' />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Segment>
        </Segment.Group>
    )
})