import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Container, Image, List } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function ProfesoriDetais() {
    const { profesoriStore } = useStore();
    const { selectedProfessor: profesori,loadProfesori,loadingInitial ,openForm, cancelSelectedProfessor } = profesoriStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadProfesori(id);
    }, [id, loadProfesori]);

    if (loadingInitial || !profesori) return <LoadingComponent />;

    return (
        <Card fluid>
         <Image src={(`/assets/categoryImages/{profesori.}.jpg`)} /> 
            <Card.Content>
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

            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>.
                    {/* redirecting buttons  */}
                    {/* <Button as={Link} to={`/manageLenda/${lenda.lendaId}`} basic color='blue' content='Edit' />
                    <Button as={Link} to='/lendet' basic color='red' content='Cancel' /> */}
                    {/* non redirecting buttons */}
                    <Button onClick={() => openForm(profesori.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedProfessor} basic color='red' content='Cancel' />

                </Button.Group>

            </Card.Content>
        </Card>
        // <List>
        //     <div className='details'>
        //         <Image src={`/images/ProfImg/${profesori.name}.jpg`} />
        //         <Card.Content>
        //             <Card.Description className='teDhena'>
        //                 <Card.Header className='Emri'>Te dhenat e Profesorit:</Card.Header>

        //                 <div className="data"><label >Emri:  </label> {profesori.name}  </div>
        //                 <div className="data"><label >Lenda:  </label> "Not implemented yet"{profesori.EmriLendes}  </div>
        //                 <div className="data"><label >Email zyrtare:  </label>  {profesori.email}</div>
        //                 <div className="data"><label >Grada Akademike:  </label> {profesori.gradaAkademike}</div>
        //                 <div className="data"><label>I punesuar nga data:  </label> {profesori.dataRegjistrimit}</div>
        //             </Card.Description>
        //         </Card.Content>
        //     </div>
        //     <Card.Content extra>
        //         {/* <Container>
        //             <Button onClick={() => openForm(profesori.id)} color='blue' content='Edit' className='detailsbtn' />
        //             <Button name={profesori.id}
        //                 loading={loading && target === profesori.id}
        //                 onClick={(e) => handleProfessorDelete(e, profesori.id)}
        //                 content='Fshije' className='detailsbtn' color='red' />
        //             <Button onClick={cancelSelectedProfessor} color='grey' content='cancel' className='detailsbtn' />
        //         </Container> */}
        //         <Button.Group widths='2'>.
        //             {/* redirecting buttons  */}
        //             {/* <Button as={Link} to={`/manageLenda/${lenda.lendaId}`} basic color='blue' content='Edit' />
        //             <Button as={Link} to='/lendet' basic color='red' content='Cancel' /> */}
        //             {/* non redirecting buttons */}
        //             <Button onClick={() => openForm(profesori.id)} basic color='blue' content='Edit' />
        //             <Button onClick={cancelSelectedProfessor} basic color='red' content='Cancel' />

        //         </Button.Group>

        //     </Card.Content>
        // </List>
    )
})