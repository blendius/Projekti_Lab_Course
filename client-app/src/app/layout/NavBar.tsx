import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
// interface Props {
//     showProf: () => void;

// }

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          Sistemi Menaxhimit
        </Menu.Item>
        <Menu.Item as={NavLink} to="/profesoret" name="Profesoret">
          {/* <Button as={NavLink} to='/profesoret' positive content="Profesoret" className="btn" /> */}
        </Menu.Item>
      </Container>
    </Menu>
  );
}
