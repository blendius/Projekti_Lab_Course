import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, List, Segment, Table, TableBody, TableCell, TableRow } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';



export default observer(function ProfesoriList() {
    const { profesoriStore } = useStore();
    const { profesoretByDate, deleteProfessor, selectProfessor, loading } = profesoriStore;
    const [target, setTarget] = useState('');
    
    function handleProfesoriDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteProfessor(id);

    }


    return (
        <Segment.Group>
            <Segment className='profesoretList'>
                <Table celled compact >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Emri i Profesorit</Table.HeaderCell>
                            <Table.HeaderCell>Grada Akademike</Table.HeaderCell>
                            <Table.HeaderCell>Data e Punesimit</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Lenda e Profesorit</Table.HeaderCell>
                            <Table.HeaderCell>Shiko</Table.HeaderCell>
                            <Table.HeaderCell>Fshije</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <TableBody>
                        {profesoretByDate.map(profesori => (
                            <TableRow key={profesori.id}>
                                <TableCell >{profesori.name}</TableCell>
                                <TableCell>{profesori.gradaAkademike}</TableCell>
                                <TableCell>{profesori.dataRegjistrimit}</TableCell>
                                <TableCell>{profesori.email}</TableCell>
                                <TableCell>Lenda Not implemented yet</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => profesoriStore.selectProfessor(profesori.id)}
                                        floated='right'
                                        content='View'
                                        color='blue' />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        name={profesori.id}
                                        loading={loading && target === profesori.id}
                                        onClick={(e) => handleProfesoriDelete(e, profesori.id)}
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