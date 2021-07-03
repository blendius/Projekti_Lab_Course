import { observer } from "mobx-react-lite";
import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function FamiljaList() {
    const { familjaStore, prindiStore, nxenesiStore } = useStore();
    const { familjetById, deleteFamilja, loading } = familjaStore;
    const [target, setTarget] = useState('');

    const{getEmriPrinditById}= prindiStore;
    const{getEmriNxenesitById}=nxenesiStore;

    useEffect(() => {
        familjaStore.loadFamiljet();
        prindiStore.loadPrinderit();
        nxenesiStore.loadNxenesit();
    }, [familjaStore, prindiStore, nxenesiStore])

    function handleFamiljaDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteFamilja(id);
    }

    return (
        <Segment.Group>
        <Segment className='pareleletList'>
            <Table celled compact >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell >Prindi</Table.HeaderCell>
                        <Table.HeaderCell >Femija</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <TableBody>
                    {familjetById.map(fam => (
                        <TableRow key={fam.familjaId}>
                            <TableCell >{getEmriPrinditById(fam.prindiId)}</TableCell>
                            <TableCell >{getEmriNxenesitById(fam.nxenesiId)}</TableCell>
                            <TableCell width='2'>
                                <Button
                                    onClick={() => familjaStore.selectFamilja(fam.familjaId)}
                                    floated='left'
                                    content='Shiko'
                                    color='blue' />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Segment>
    </Segment.Group>
    )
})

function setTarget(name: string) {
    throw new Error("Function not implemented.");
}
