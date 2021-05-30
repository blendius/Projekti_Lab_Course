//import react from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
// import { useStore } from '../stores/store';
 

export default function NavBar(){

    // const {postimiStore} =useStore();
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item  as={NavLink} to='/' exact header >
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}} />
                    Postimet
                </Menu.Item>
                <Menu.Item as={NavLink} to="/postimet" name='Postimet'/>
                <Menu.Item as={NavLink} to="/lendet" name='Lendet'/>
                <Menu.Item>
                    <Button as={NavLink} to='/krijoPostime' positive content='Krijo Postim'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}