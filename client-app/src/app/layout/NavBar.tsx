//import react from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';
 

export default function NavBar(){

    const {postimiStore} =useStore();
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header >
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}} />
                    Postimet
                </Menu.Item>
                <Menu.Item name='Postimet'/>
                <Menu.Item>
                    <Button onClick={()=>postimiStore.openForm()} positive content='Krijo Postim'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}