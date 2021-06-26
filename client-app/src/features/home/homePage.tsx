import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginFormProf from '../profesoret/form/LoginFormProf';
import RegisterFormProf from '../profesoret/form/RegisterFormProf';
import LoginFormPrindi from '../prinderit/form/LoginFormPrindi';
import RegisterFormPrindi from '../prinderit/form/RegisterFormPrindi';
import LoginForm from '../users/LoginForm';

export default observer(function HomePage() {
    const { adminStore, modalStore, profesoriStore } = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='assets/school.png' alt='Logo' style={{ marginBottom: 12 }} />
                    Menaxhimi i Shkolles

                </Header>
                {adminStore.isLoggedIn ? (
                    <>
                        <Header as='h2' content='Mire se vini' />
                        <Button as={Link} to='/adminPage/paneli' size='huge' inverted>
                            Vazhdo Tek Paneli!
                        </Button>
                    </>
                ) : (<>
                    <Button onClick={() => modalStore.openModal(<LoginForm />)} to='/login' size='huge' inverted>
                        Kycu si Admin!
                    </Button>
                    <Button onClick={() => modalStore.openModal(<LoginFormPrindi />)} size='huge' inverted>
                        Kycu si Prind!
                    </Button>
                    
                </>
                )}
                {profesoriStore.isLoggedIn ? (
                    <>
                        <Header as='h2' content='Mire se vini' />
                        <Button as={Link} to='/professorPage/ProfProfili' size='huge' inverted>
                            Vazhdo Tek Profili!
                        </Button>
                    </>
                ) : (
                    <>
                    <Button onClick={()=>modalStore.openModal(<LoginFormProf/>)} size='huge' inverted>
                        Kyqu si Profesor!
                    </Button>
                    
                    </>
                )} 


            </Container>
        </Segment>
    )
})