import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Item, List, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';



export default observer(function KlubiList() {
    const {klubiStore}= useStore();
    const {klubetByDate}=klubiStore;

        return (
            <Segment clearing>
            
            <List divided relaxed >
                {klubetByDate.map(klubi => (
                    <List.Item key={klubi.id}>
                         
                            <List.Content>
                                <List.Header as='a'>{klubi.emriKlubit}</List.Header>
                                <div className="data" ><label>Lloji klubit:  </label>  {klubi.llojiKlubit}</div>
                                <div className="data" ><label>Numri antareve:  </label>  {klubi.nrAntareve}</div>
                                <div className="data" ><label>Pershkrimi:  </label>  {klubi.pershkrimi}</div>
                                <div className="data" ><label>Udheheqesi:  </label>  {klubi.udheheqesi}</div>
                                <div className="data" ><label>Data:  </label>  {klubi.dataRregjistrimit}</div>

                            </List.Content>
                            <Item.Extra>
                                 <Button onClick={()=> klubiStore.openForm(klubi.id)} primary content='Edit' className='detailsbtn' floated="left" />
                                <Button onClick={() => klubiStore.deleteKlubi(klubi.id)} floated='right' content='Delete' color='red' />
                                
                            </Item.Extra>
    
                        </List.Item>
                    
    
                ))} 
     
            </List>
            </Segment>
        )
    }) 