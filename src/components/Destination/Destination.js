/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Card, Col, Container, Row } from 'react-bootstrap';
import TicketImage from '../../images/ticket.png';
import fakeData from '../../fakeData/fakeData';
import LocationMap from '../LocationMap/LocationMap';
import { UserContext } from '../../App';

// export let LocationContext = createContext();

const Destination = () => {
    let [location, setLocation] = useState({
        currentLocation: '',
        destinationLocation : ''
    });

    let {id} = useParams();
    let count = parseInt(id);
    let collection = [];
    const [newUser, setNewUser] = useState(true);
    const [ticket, setTicket] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    useEffect( () => {
        setTicket(fakeData);
    },[]);

    let data = ticket.map(tkt => {
        collection.push(tkt.price);
       
    });

    const atIndex = collection.find(function(element, index){
        if(count === 1){
            return index === 0;
        }
        else if(count === 2){
            return index === 1;
        }
        else if(count === 3){
            return index === 2;
        }
        else if(count === 4){
            return index === 3;
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

    let currentDate = function(sp){
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; //As January is 0.
        let yyyy = today.getFullYear();
        
        if(dd<10) dd='0'+dd;
        if(mm<10) mm='0'+mm;
        return (mm+sp+dd+sp+yyyy);
        };

        console.log(currentDate('-'));

   const handleSearch = (isTrue) => {
    isTrue = false;
    setNewUser(isTrue);
    
}


    return (
        <Container style={{marginTop: '50px'}}>
            
           {<p> Welcome {loggedInUser.name || loggedInUser.email}</p>}
            <Row>
                <Col xs={12} sm={12} md={6} lg={6} style={{marginBottom:'50px', textAlign:'center'}}>
                    {newUser && <form style={{backgroundColor:'lavender', padding:'20px'}}>
                        <p>Pick From</p>
                        <input type='text' name='current-city' onBlur={handleBlur} placeholder='current city name' required />
                        <br />
                        <p>Pick To</p>
                        <input type='text' name='destination-city' onBlur={handleBlur} placeholder='destination city name' required />
                        <br />
                        <input style={{marginTop:'10px'}} type='text' placeholder={`${currentDate('-')}`}/>
                        <br />
                        <button onClick={() => handleSearch(newUser)} style={{marginTop:'20px'}}
                        >Search</button>
                    </form>}

                    {(newUser === false) &&
                        <Card style={{ width: '14rem', height: '16rem', backgroundColor:'lavender'}}>
                            <Card.Body>
                                <Card.Title style={{ color: 'black' }}>From {location.currentLocation} ----- to {location.destinationLocation}</Card.Title>
                                <Card.Text style={{ color: 'black' }}>
                                    <Card.Img src={TicketImage} style={{ height: '30px', width: '40px' }} alt=''></Card.Img>
                                    <span style={{margin:'5px'}}>Ticket number{id}</span>
                                    <p>Price of this ticket is {atIndex} Tk.</p>
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
