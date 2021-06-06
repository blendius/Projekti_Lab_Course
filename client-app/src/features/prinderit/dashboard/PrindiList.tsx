import React, { SyntheticEvent, useState } from 'react';
import { Button,  Item, Segment } from 'semantic-ui-react';
import { Prindi } from '../../../app/models/prindi';

interface Props {
    prinderit: Prindi[];
    selectedPrindi: (id: string) => void;
    deletePrindi: (id: string) => void;
    cancelSelectPrindi: () => void;
    openForm: (id: string) => void;
    submitting: boolean;
}

export default function PrindiList({ prinderit, selectedPrindi, deletePrindi, cancelSelectPrindi, openForm, submitting }: Props) {
    const [target, setTarget] = useState('');

    function handlePrindiDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deletePrindi(id)
    }

    return (
        <Segment clearing>
            <Item.Group divided >
                {prinderit.map(prindi => (
                    <Item key={prindi.id}>
                        <Item.Content>
                            <div className="prindiData">
                                <Item.Header as='a'>{prindi.emri} {prindi.mbiemri}</Item.Header>
                               
                                <div><label className="data">Email zyrtare:  </label>  {prindi.email}</div>
                                <div><label className="data">Nr. telefonit:</label> {prindi.nrTel}</div>
                            </div>
                            <div className='buttons'>
                                <Button onClick={() => openForm(prindi.id)} primary content='Edit' className='detailsbtn' inverted />
                                <Button name={prindi.id}
                                    loading={submitting && target === prindi.id}
                                    onClick={(e) => handlePrindiDelete(e, prindi.id)}
                                    content='Fshije' className='detailsbtn' color='red' inverted />
                            </div>
                        </Item.Content>

                    </Item>


                ))}

            </Item.Group>
        </Segment>
    )
}