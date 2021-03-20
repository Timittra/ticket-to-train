/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Card, Col, Container, Row } from 'react-bootstrap';
import TicketImage from '../../images/ticket.png';
import fakeData from '../../fakeData/fakeData';
import LocationMap from '../LocationMap/LocationMap';

export let LocationContext = createContext();

const Destination = () => {
    let [location, setLocation] = useState({
        currentLocation: '',
        destinationLocation : ''
    });

    let {id} = useParams();
    const [newUser, setNewUser] = useState(true);
    const [ticket, setTicket] = useState([]);

    useEffect( () => {
        setTicket(fakeData);
    },[]);

    
    const result = fakeData.find((data) => {
            if(data.id === id){
                return data.price;
            }  
      });
    

     const handleBlur = (e) => {
        if(e.target.name === 'current-city'){
            const presentLocation = {...location};
            presentLocation.currentLocation = e.target.value;
            setLocation(presentLocation);

        }
        if(e.target.name === 'destination-city'){
            const newLocation = {...location};
            newLocation.destinationLocation = e.target.value;
            setLocation(newLocation);
        }
      
    }

const handleSearch = (isTrue) => {
    isTrue = false;
    setNewUser(isTrue);
    
}

    return (
        <Container style={{marginTop: '50px'}}>
            <Row>
                <Col xs={12} sm={12} md={6} lg={6}>
                    {newUser && <form>
                        <p>Pick From</p>
                        <input type='text' name='current-city' onBlur={handleBlur} placeholder='current city name' required />
                        <br />
                        <p>Pick To</p>
                        <input type='text' name='destination-city' onBlur={handleBlur} placeholder='destination city name' required />
                        <br />
                        <button onClick={() => handleSearch(newUser)}
                        >Search</button>
                    </form>}

                    {(newUser === false) &&
                        <Card style={{ width: '14rem', height: '16rem' }}>
                            <Card.Body>
                                <Card.Title style={{ color: 'black' }}>From {location.currentLocation} to {location.destinationLocation}</Card.Title>
                                <Card.Text style={{ color: 'black' }}>
                                    <Card.Img src={TicketImage} style={{ height: '30px', width: '40px' }} alt=''></Card.Img>
                                    <span>Ticket{id} ${result} </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    }
                </Col>
                <Col  xs={12} sm={12} md={6} lg={6}>
                    <LocationMap></LocationMap>
                </Col>
            </Row>
        </Container>
    );
};

export default Destination;