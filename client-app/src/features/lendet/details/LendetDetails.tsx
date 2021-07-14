import React from 'react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Button, Card } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { format } from 'date-fns';



export default observer(function LendetDetails() {
    const { lendaStore,syllabusiStore } = useStore();
    const { selectedLenda: lenda, loadLenda, loadingInitial, cancelSelectedLenda, openForm } = lendaStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadLenda(id);
    }, [id, loadLenda]);

    if (loadingInitial || !lenda) return <LoadingComponent />;
    return (
        <Card fluid>
            {/* <Image src={`/assets/categoryImages/food.jpg`} /> */}
            <Card.Content>
                <Card.Header>{lenda.emriLendes}</Card.Header>
                <Card.Meta>
                    <span>{format(lenda.dataEShtimit!, 'dd MMM yyyy')}</span>
                </Card.Meta>
                <Card.Description>
                    {lenda.pershkrimi}
                    <div>

                    </div>
                    {syllabusiStore.getSyllabusiEmri(lenda.syllabusiId)}
                </Card.Description>
                
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>.
                    {/* redirecting buttons  */}
                    {/* <Button as={Link} to={`/manageLenda/${lenda.lendaId}`} basic color='blue' content='Edit' />
                    <Button as={Link} to='/lendet' basic color='red' content='Cancel' /> */}
                    {/* non redirecting buttons */}
                    <Button onClick={() => openForm(lenda.lendaId)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedLenda} basic color='red' content='Cancel' />

                </Button.Group>

            </Card.Content>
        </Card>
    )
})