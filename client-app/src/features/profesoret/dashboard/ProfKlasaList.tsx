import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Button, Item, List } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';



export default observer(function ProfKlasaList() {
    const { profesoriStore, klasaStore, paraleljaStore } = useStore();
    const { profesoretKlasaByDate, selectedProfessor, deleteKlasaProfessor, loading } = profesoriStore;
    const { klasatRegistry } = klasaStore;
    useEffect(() => {
        profesoriStore.loadProfesoriKlaset(selectedProfessor?.id);
    }, [profesoriStore])

    function getEmriKlases(id: string) {
        const klasa = klasatRegistry.get(id);
        if (klasa) {
            return klasa?.viti + "/" + paraleljaStore.getNumriParalelesById(klasa.paraleljaId)
        }
    }
    const [target, setTarget] = useState('');

    function handleProfKlasaDelete(e: SyntheticEvent<HTMLButtonElement>, id: string | undefined) {
        setTarget(e.currentTarget.name);
        deleteKlasaProfessor(id);

    }
    // const klasa= klasaStore.getKlasa()

    return (
        <List divided relaxed >

            {profesoretKlasaByDate.map(profklasa => (
                <List.Item key={profklasa.id}>
                    <List.Content>
                        <List.Header as='a'>{getEmriKlases(profklasa.klasaId)}</List.Header>

                        <Button
                            loading={loading && target === profklasa.id}
                            onClick={(e) => handleProfKlasaDelete(e, profklasa.id)}
                            floated='right'
                            content='Largo nga klasa' color='google plus' />
                    </List.Content>

                </List.Item>


            ))}


        </List>
    )
})