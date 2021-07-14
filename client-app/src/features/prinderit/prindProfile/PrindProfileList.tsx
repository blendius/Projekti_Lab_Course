import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default function PrindProfileList() {
    const{prindStoreAccount:{prindi}}=useStore();
    
    return(
    <>
        <Grid.Row>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column  width={10}>
                <Grid.Row >
                    <h2>{prindi?.displayName} </h2>
                    <p></p>
                </Grid.Row>
               
                <Grid.Row>
                    <p className='profileData'> Username:{prindi?.userName}</p>
                </Grid.Row>
               
                <Grid.Row>
                    <p className='profileData'>Email: {prindi?.email} </p>
                </Grid.Row>
                <Grid.Row>
                    <p className='profileData'>Data e Lindjes: {prindi?.dataLindjes} </p>
                </Grid.Row>

                <Grid.Row>
                    <p className='profileData'>Numri i telefonit: {prindi?.nrTel} </p>
                </Grid.Row>
            </Grid.Column>
           
        </Grid.Row>
        </>
    )
}