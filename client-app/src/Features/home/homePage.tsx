import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react';
export default function HomePage(){
    return(
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='assets/school.png' alt='Logo' style={{marginBottom:12}}/>
                    Menaxhimi i Shkolles
                
                </Header>
                <Header as='h2' content='Mire se vini'/>
                <Button as={Link} to='/profesoret' size='huge' inverted>
                    Vazhdo Tek Kryefaqja!
                </Button>
            </Container>
        </Segment>
    )
}