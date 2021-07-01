import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Item, List } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import VlersimiStore from '../../app/stores/vlersimiStore';



export default observer(function VlersimiList() {
const {vleresimiStore}= useStore();
const {vlersimietByDate}=vleresimiStore;

    return (
        <List divided relaxed inverted>
            {vlersimietByDate.map(vlersimi => (
                <List.Item key={vlersimi.vleresimiId}>
                        <List.Icon name='address card' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>{vlersimi.lenda}</List.Header>
                            <div className="data" ><label>Nota:  </label>  {vlersimi.nota}</div>
                            <div className="data" ><label>Gjysemvjetori:  </label>  {vlersimi.gjysemvjetori}</div>
                        </List.Content>
                        <Item.Extra>
                            <Button onClick={() => vleresimiStore.selectVlersimi(vlersimi.vleresimiId)} floated='right' content='Shiko Detajet' color='blue' />
                            
                        </Item.Extra>

                    </List.Item>
                

            ))}

        </List>
    )
})