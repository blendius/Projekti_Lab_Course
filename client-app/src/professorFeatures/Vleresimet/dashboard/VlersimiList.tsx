import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, Item, List, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';



export default observer(function VlersimiList() {
const {vleresimiStore, profesoriStore,nxenesiStore}= useStore();
const {vlersimietByDate}=vleresimiStore;
useEffect(() => {
    vleresimiStore.loadVleresimet(profesoriStore.prof?.id);
  }, [vleresimiStore,profesoriStore.prof?.id])

    return (
        <Segment >   
        <List divided relaxed size='medium'  >
            {vlersimietByDate.map(vlersimi => (
                <List.Item key={vlersimi.vleresimiId} >
                        <List.Content  >
                            <List.Header as='a'>{nxenesiStore.getEmriNxenesitById(vlersimi.nxenesiId)}</List.Header>
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