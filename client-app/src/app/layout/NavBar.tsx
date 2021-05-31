import { Button, Container, Menu } from 'semantic-ui-react';
interface Props {
  openForm:()=>void;
    
}


export default function NavBar({ openForm}: Props) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                   Test
                </Menu.Item>
                <Menu.Item>
                    
                    <Button onClick={openForm} positive content="Shto Prindin"/>

                </Menu.Item>
            </Container>
        </Menu>
    )
}