import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Container, Image, List } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function ProfesoriDetais() {
    const { profesoriStore } = useStore();
    const { selectedProfessor: profesori, loadProfesori, loadingInitial, openForm, cancelSelectedProfessor, openAddKlasaForm } = profesoriStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadProfesori(id);
    }, [id, loadProfesori]);

    if (loadingInitial || !profesori) return <LoadingComponent />;

    return (
        <Card fluid>
            <Card.Content >
                <Card.Header>{profesori.name}</Card.Header>
                <Card.Meta>
                    <span>{profesori.dataRegjistrimit!}</span>
                </Card.Meta>
                <Card.Description>
                    Email : {profesori.email}
                </Card.Description>
                <Card.Description>
                    Grada Akademike : {profesori.gradaAkademike}
                </Card.Description>
                <Button onClick={() => openAddKlasaForm(profesori.id)} color='blue' content='Klaset' className='klasa' inverted />

            </Card.Content>
            <Card.Content extra>
                <Container textAlign="center">

                    <Button onClick={() => openForm(profesori.id)} color='blue' content='Edit' className='detailsbtn' />
                    {/* <Button name={profesori.id}
                        loading={loading && target === profesori.id}
                        onClick={(e) => handleProfessorDelete(e, profesori.id)}
                        content='Fshije' className='detailsbtn' color='red' /> */}
                    <Button onClick={cancelSelectedProfessor} color='grey' content='cancel' className='detailsbtn' />

                </Container>



            </Card.Content>
        </Card>

    )
})