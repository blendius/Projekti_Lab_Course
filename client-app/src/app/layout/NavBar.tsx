import React from 'react';
import { Button, Container, Icon, Menu } from 'semantic-ui-react';
import  './styles.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import NxenesiDashboard from '../../Features/nxenesit/dashboard/NxenesiDashboard';

export default function NavBar() {
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/school.png" alt="logo" style={{marginRight: '10px'}}/>
                    <Link to="/">Gjimnazi</Link>               
                </Menu.Item>
                <Menu.Item style={{marginInlineStart: "auto"}} >
                <Link to="/Profili">
                <div className="ui vertical animated button">
                    <div className="hidden content">Profili</div>
                    <div className="visible content">
                    <Icon style={{fontSize:"1.5em"}} name="user"></Icon>
                    </div>
                    </div>
                </Link> 
                </Menu.Item>
           
            </Container>
        </Menu>
    )
}