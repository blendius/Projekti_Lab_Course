import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Item, List, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import VlersimiStore from '../../../app/stores/vlersimiStore';
import VleresimiDetails from './VleresimiDetails';



export default observer(function VlersimiList() {
const {vleresimiStore, profesoriStore,modalStore,nxenesiStore}= useStore();
const {vlersimietByDate}=vleresimiStore;
useEffect(() => {
    vleresimiStore.loadVleresimet(profesoriStore.prof?.id);
  }, [vleresimiStore])

    return (
        <Segment >   
        <List divided relaxed size='medium'  >
            {vlersimietByDate.map(vlersimi => (
                <List.Item key={vlersimi.vleresimiId} >
                        <List.Content  >
                            <List.Header as='a'>{nxenesiStore.getEmriById(vlersimi.nxenesiId)}</List.Header>
                            <div className="data" ><label>Nota:  </label>  {vlersimi.nota}</div>
                            <div className="data" ><label>Lenda:  </label>  {vlersimi.lenda}</div>
                        </List.Content>
                        <Item.Extra>
                            <Button onClick={() => vleresimiStore.selectVlersimi(vlersimi.vleresimiId)} fluid content='Shiko Detajet' color='blue' size='tiny' />
                         
                            
                        </Item.Extra>

                    </List.Item>
                

            ))}

        </List>
        </Segment>
    )
})