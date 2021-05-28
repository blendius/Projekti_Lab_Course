import { Button, Container, Menu } from 'semantic-ui-react';
interface Props {
    showProf: () => void;
}


export default function NavBar({ showProf, }: Props) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    Profesori
                </Menu.Item>
                <Menu.Item name="Profesori" />
                <Menu.Item>
                    <Button onClick={showProf} positive content="Profesoret" className="btn" />

                </Menu.Item>
            </Container>
        </Menu>
    )
}