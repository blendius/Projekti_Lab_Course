import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { useStore } from "../app/stores/store";
// import "./styles.css";

export default observer(function NavBar() {
  const {
    adminStore: { user, logout },
    profesoriStore: { prof, logoutProf },
    prindStoreAccount: { prindi, logoutPrindi },
  } = useStore();
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
        <Menu.Item as={NavLink} to="adminPage/paneli" name="Paneli" />
        <Menu.Item as={NavLink} to="/adminPage/profesoret" name="Profesoret" />
        <Menu.Item as={NavLink} to="/adminPage/terminet" name="Terminet" />
        <Menu.Item as={NavLink} to="/adminPage/lendet" name="Lendet" />
        <Menu.Item as={NavLink} to="/adminPage/prinderit" name="Prinderit" />
        <Menu.Item as={NavLink} to="/adminPage/nxenesit" name="Nxenesit" />
        <Menu.Item as={NavLink} to="/adminPage/njoftimet" name='Njoftimet'/>
        <Menu.Item position="right">
          <Image
            src={user?.image || "/assets/user.png"}
            avatar
            spaced="right"
          />
          <Dropdown pointing="top right" text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profili/${user?.username}`}
                text="Profili Im"
                icon="user"
              />
              <Dropdown.Item onClick={logout} text="Ckycu" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        {/* <Menu.Item position='right'>
          <Image src={prof?.image || '/assets/user.png'} avatar spaced='right' />
          <Dropdown pointing='top right' text={prof?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={'/ProfProfili'} text="Profili Im" icon='user' />
              <Dropdown.Item onClick={logoutProf} text='Ckycu' icon='power' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>

        <Menu.Item position='right'>
          <Image src={prindi?.image || '/assets/user.png'} avatar spaced='right' />
          <Dropdown pointing='top right' text={prindi?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/profili/${prindi?.username}`} text="Profili Im" icon='user' />
              <Dropdown.Item onClick={logoutPrindi} text='Ckycu' icon='power' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item> */}

        {/* <Menu.Item style={{ marginInlineStart: "auto" }}>
          <Link to="/Profili">
            <div className="ui vertical animated button">
              <div className="hidden content">Profili</div>
              <div className="visible content">
                <Icon style={{ fontSize: "1.5em" }} name="user"></Icon>
              </div>
            </div>
          </Link>
        </Menu.Item> */}
      </Container>
    </Menu>
  );
});
