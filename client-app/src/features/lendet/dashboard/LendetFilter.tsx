import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

export default function LendetFilter() {
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%' ,marginTop : 25}}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item content='Te Gjitha Lendet' />
                <Menu.Item content='Obligative' />
                <Menu.Item content='Zgjedhore' />
            </Menu>
            <Header/>
            <Calendar/>
        </>
    )
}