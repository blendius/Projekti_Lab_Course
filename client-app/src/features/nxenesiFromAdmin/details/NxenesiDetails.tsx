import { observer } from 'mobx-react-lite';
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
export default observer(function NxenesiDetails () {
    const {nxenesiStore} = useStore();
    const {selectedNxenesi: nxenesi, loadingInitial, cancelSelectedNxenesi, openForm} = nxenesiStore;

    if(loadingInitial || !nxenesi) return <LoadingComponent/>;

    return(
        <Card fluid>
           <Image src={`/assets/nxenesiImages/${nxenesi.fullName}.jpg`}/>
            <Card.Content>
                <Card.Header>{nxenesi.fullName}</Card.Header>
                <Card.Description>
                    <div><label>Emri i prindit: </label>{nxenesi.parentName}</div>
                    <div><label>Data e lindjes </label>{nxenesi.dateOfBirth}</div>
                    <div><label>Klasa: </label>{nxenesi.class}</div>
                    <div><label>Email: </label>{nxenesi.email}</div>
                    <div><label>Numri i telefonit: </label>{nxenesi.phoneNumber}</div>
                    <div><label>Viti i regjistrimit: </label>{nxenesi.yearOfRegistration}</div>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths='2'>
                    <Button onClick={() => openForm(nxenesi.id)} basic color='blue' content='Edito'/>
                    <Button onClick={cancelSelectedNxenesi} basic color='grey' content='Anulo'/>
                </ButtonGroup>
            </Card.Content>
        </Card>

    )
})