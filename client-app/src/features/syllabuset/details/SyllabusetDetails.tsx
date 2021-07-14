import React from 'react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Button, Card } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { format } from 'date-fns';



export default observer(function SyllabusetDetails() {
    const { syllabusiStore } = useStore();
    const { selectedSyllabusi: syllabusi, loadSyllabusi, loadingInitial, cancelSelectedSyllabusi, openForm } = syllabusiStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadSyllabusi(id);
    }, [id, loadSyllabusi]);

    if (loadingInitial || !syllabusi) return <LoadingComponent />;
    return (
        <Card fluid>
            {/* <Image src={`/assets/categoryImages/food.jpg`} /> */}
            <Card.Content>
                <Card.Header>{syllabusi.emriSyllabusit}</Card.Header>
                <Card.Meta>
                    <span>{format(syllabusi.dataEKrijimit!, 'dd MMM yyyy')}</span>
                </Card.Meta>
                <Card.Description>
                    <Card.Meta>
                        Syllabusi ID
                    </Card.Meta>
                    {syllabusi.syllabusiId}
                    <div>

                    </div>
                    <Card.Meta>
                        Linku I Syllabusit 
                    </Card.Meta>
                    <a href={`${syllabusi.linkuISyllabusit}`}>{syllabusi.linkuISyllabusit}</a>
                </Card.Description>

            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>.
                    {/* redirecting buttons  */}
                    {/* <Button as={Link} to={`/manageLenda/${syllabusi.lendaId}`} basic color='blue' content='Edit' />
                    <Button as={Link} to='/lendet' basic color='red' content='Cancel' /> */}
                    {/* non redirecting buttons */}
                    <Button onClick={() => openForm(syllabusi.syllabusiId)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedSyllabusi} basic color='red' content='Cancel' />

                </Button.Group>

            </Card.Content>
        </Card>
    )
})