import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';



export default function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to="/" exact header>
                   Sistemi i Menaxhimit
                </Menu.Item>
                <Menu.Item as={NavLink} to="/prinderit" name='Prinderit'>
                    
                   

                </Menu.Item>
            </Container>
        </Menu>
    )
}