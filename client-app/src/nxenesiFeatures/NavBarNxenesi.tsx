import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";
import { useStore } from "../app/stores/store";
// import "./styles.css";

export default observer(function NavBarNxenesi() {
  const { nxenesiStore: { nxenesit, logoutNxenesi } } = useStore();
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/school.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          <Link to="/">Gjimnazi</Link>
        </Menu.Item>

        <Menu.Item content="Profili im" />
        <Menu.Item onClick={logoutNxenesi} text='Ckycu' icon='power' />


      </Container>
    </Menu>
  );
})