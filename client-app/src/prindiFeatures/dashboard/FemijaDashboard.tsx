import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { List, Segment, Table, TableBody, TableCell, TableRow } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import VlersimiStore from '../../app/stores/vlersimiStore';

export default observer(function FemijaDashboard() {
    const { vleresimiStore, profesoriStore, prindStoreAccount: { prindi } } = useStore();
    const { vlersimiNgaPrindi, editMode, vlersimiNgaPrindiRegistry, loadNxenesiByPrindi } = vleresimiStore;
    const { getEmriProfById } = profesoriStore;
    console.log(prindi?.id)
    useEffect(() => {
        //get vlersimet e nxenesit 
      vleresimiStore.loadVleresimetByNxenesi(vlersimiNgaPrindi[0]?.nxenesiId);
    }, [vleresimiStore])
    console.log(vlersimiNgaPrindi[0]?.nxenesiId)

    return (
        <Segment.Group>
            <Segment className='femijetList'>
                <Table celled compact >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell >Profesori</Table.HeaderCell>
                            <Table.HeaderCell >Nota</Table.HeaderCell>
                            <Table.HeaderCell>Gjysemvjetori</Table.HeaderCell>
                            <Table.HeaderCell>Data e dhenies se notes:</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <TableBody>
                        {vlersimiNgaPrindi.map(vleresimet => (
                            <TableRow key={vleresimet.vleresimiId}>
                                <TableCell width="5">{getEmriProfById(vleresimet.profId)}</TableCell>
                                <TableCell width="2">{vleresimet.nota}</TableCell>
                                <TableCell width="2">{vleresimet.gjysemvjetori}</TableCell>
                                <TableCell width="2">{vleresimet.dataRegjistrimit}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Segment>
        </Segment.Group>
    )
})