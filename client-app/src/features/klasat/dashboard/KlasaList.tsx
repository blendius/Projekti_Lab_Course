import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Button, Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function KlasaList() {
    const { klasaStore, sallaStore, paraleljaStore } = useStore();
    const { deleteKlasa, loading, klasatByVit } = klasaStore;
    const { getEmriSallesById } = sallaStore;
    const { getNumriParalelesById } = paraleljaStore;
    const [target, setTarget] = useState('');

    function handleKlasaDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteKlasa(id);
    }

    return (
        <Segment.Group>
            <Segment className='pareleletList'>
                <Table celled compact >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell >Klasa</Table.HeaderCell>
                            <Table.HeaderCell >Salla</Table.HeaderCell>
                            <Table.HeaderCell>Shiko</Table.HeaderCell>
                            <Table.HeaderCell>Fshije</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <TableBody>
                        {klasatByVit.map(klasat => (
                            <TableRow key={klasat.klasaId}>
                                <TableCell >{klasat.viti}/{getNumriParalelesById(klasat.paraleljaId)}</TableCell>
                                <TableCell >{getEmriSallesById(klasat.sallaId)}</TableCell>
                                <TableCell width='2'>
                                    <Button
                                        onClick={() => klasaStore.selectKlasa(klasat.klasaId)}
                                        floated='right'
                                        content='Shiko'
                                        color='blue'
                                    />
                                </TableCell>
                                <TableCell width='2' >
                                    <Button
                                        name={klasat.paraleljaId}
                                        loading={loading && target === klasat.klasaId}
                                        onClick={(e) => handleKlasaDelete(e, klasat.klasaId)}
                                        floated='right'
                                        content='Fshij'
                                        color='red'
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Segment>
        </Segment.Group>
    )
})