import React from "react";
import { Button, Container, Icon, Menu } from "semantic-ui-react";
import "./styles.css";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";

export default function NavBar() {
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
        <Menu.Item as={NavLink} to="/profesoret" name="Profesoret" />
        <Menu.Item as={NavLink} to="/terminet" name="Terminet" />
        <Menu.Item as={NavLink} to="/lendet" name="Lendet" />
        <Menu.Item as={NavLink} to="/prinderit" name="Prinderit" />
        <Menu.Item style={{ marginInlineStart: "auto" }}>
          <Link to="/Profili">
            <div className="ui vertical animated button">
              <div className="hidden content">Profili</div>
              <div className="visible content">
                <Icon style={{ fontSize: "1.5em" }} name="user"></Icon>
              </div>
            </div>
          </Link>
        </Menu.Item>
      </Container>
    </Menu>
  );
}
