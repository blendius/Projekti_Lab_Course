import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";
import TerminiStore from "../stores/terminiStore";

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          Sistemi Menaxhimit
        </Menu.Item>
        <Menu.Item as={NavLink} to="/profesoret" name="Profesoret" />
        <Menu.Item as={NavLink} to="/terminet" name="Terminet" />
        <Menu.Item as={NavLink} to="/lendet" name="Lendet" />
        <Menu.Item as={NavLink} to="/prinderit" name='Prinderit'/>
        <Menu.Item as={NavLink} to="/klubet" name='Klubet'/>
        
        {/* <Button as={NavLink} to='/profesoret' positive content="Profesoret" className="btn" /> */}
      </Container>
    </Menu>
  );
}
