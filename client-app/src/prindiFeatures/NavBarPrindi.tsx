import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";
import { useStore } from "../app/stores/store";
// import "./styles.css";

export default observer(function NavBarPrindi() {

    const { prindStoreAccount: {  logoutPrindi } } = useStore();

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

        <Menu.Item content="Prindi Page" />
        <Menu.Item as={NavLink} to="/prindiPage/Kontaktet" name="Kontaktet" />

        <Menu.Item onClick={logoutPrindi} text='Ckycu' icon='power' />




      </Container>
    </Menu>
  );
})