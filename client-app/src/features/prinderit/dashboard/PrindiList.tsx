import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button,  Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function PrindiList() {
    const {prindiStore} = useStore();
    const {deletePrindi, prinderitByName, loading} = prindiStore;

    const [target, setTarget] = useState('');

    function handlePrindiDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deletePrindi(id);
    }

    return (
        <Segment clearing>
            <Item.Group divided >
                {prinderitByName.map(prindi => (
                    <Item key={prindi.id}>
                        <Item.Content>
                            <div className="prindiData">
                                <Item.Header as='a'>{prindi.displayName} </Item.Header>
                               
                                <div><label className="data">Data e lindjes:  </label>  {prindi.dataLindjes.split('T')[0]}</div>
                                <div><label className="data">Email zyrtare:  </label>  {prindi.email}</div>
                                <div><label className="data">Nr. telefonit:</label> {prindi.phoneNumber}</div>
                                <div><label className="data">Username:</label> {prindi.userName}</div>
                            </div>
                            <div className='buttons'>
                                <Button onClick={() => prindiStore.openForm(prindi.id)} primary content='Edit' className='detailsbtn' inverted />
                                <Button name={prindi.id}
                                    loading={loading && target === prindi.id}
                                    onClick={(e) => handlePrindiDelete(e, prindi.id)}
                                    content='Fshije' className='detailsbtn' color='red' inverted />
                            </div>
                        </Item.Content>

                    </Item>


                ))}

            </Item.Group>
        </Segment>
    )
})