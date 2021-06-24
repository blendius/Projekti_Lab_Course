import React from 'react';
import { Card, Segment } from 'semantic-ui-react';

export default function Paneli() {
    return(
        <Segment>
            <Card.Group itemsPerRow={4}>
                <Card color='red' >
                    <h2 >Nr Nxenesave</h2>
                </Card>
            </Card.Group>
            
        </Segment>
    )

}