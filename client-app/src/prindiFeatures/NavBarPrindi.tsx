import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Container, Dropdown, Menu } from "semantic-ui-react";
import { useStore } from "../app/stores/store";

export default observer(function NavBarPrindi() {
  const { prindStoreAccount } = useStore();
  const {logoutPrindi, prindi} = prindStoreAccount;

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

        <Menu.Item as={NavLink} to="/prindiPage/Femija" name="Fëmijët" />
        <Menu.Item as={NavLink} to="/prindiPage/Kontaktet" name="Kontaktet" />
        <Menu.Item position="right">
        <Dropdown pointing="top right" text={prindi?.displayName}>
          <Dropdown.Menu>
            <Dropdown.Item as={NavLink} to="/prindiPage/PrindProfili" text="Profili im" name="Profili im"/>
            <Dropdown.Item onClick={logoutPrindi} text='Çkyçu' icon='power' />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
      </Container>
    </Menu>
  );
})