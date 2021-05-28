import React from 'react';
import { Button, Item, List } from 'semantic-ui-react';
import { Profesori } from '../../../app/models/profesori';

interface Props {
    profesoret: Profesori[];
    selectProfessor: (id: string) => void;
  
    submitting: boolean;
}

export default function ProfesoriList({ profesoret, selectProfessor,  submitting }: Props) {

    return (
        <List divided relaxed inverted>
            {profesoret.map(profesori => (
                <List.Item key={profesori.id}>
                        <List.Icon name='address card' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>{profesori.name}</List.Header>
                            <div><label className="data">Lenda:  </label>  {profesori.lenda}</div>
                        </List.Content>
                        <Item.Extra>
                            <Button onClick={() => selectProfessor(profesori.id)} floated='right' content='Shiko Detajet' color='blue' />
                            
                        </Item.Extra>

                    </List.Item>
                

            ))}

        </List>
    )
}