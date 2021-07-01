import { observer } from "mobx-react-lite";
import { format } from "path";
import { SyntheticEvent, useState } from "react";
import { Button, Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function SallaList() {
    const { sallaStore } = useStore();
    const { deleteSalla, loading, sallatByName } = sallaStore;
    const [target, setTarget] = useState('');

    function handleSallaDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteSalla(id);
    }
    
    return (
        <Segment.Group>
            <Segment className='sallatlist'>
                <Table celled compact >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell >Salla</Table.HeaderCell>
                            <Table.HeaderCell>Shiko</Table.HeaderCell>
                            <Table.HeaderCell>Fshije</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <TableBody>
                        {sallatByName.map(sallat => (
                            <TableRow key={sallat.sallaId}>
                                <TableCell >{sallat.emriSalles}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => sallaStore.selectSalla(sallat.sallaId)}
                                        floated='right'
                                        content='Shiko'
                                        color='blue' />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        name={sallat.sallaId}
                                        loading={loading && target === sallat.sallaId}
                                        onClick={(e) => handleSallaDelete(e, sallat.sallaId)}
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