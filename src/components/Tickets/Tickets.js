/* eslint-disable no-unused-vars */
import React from 'react';
// import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import './Tickets.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillWaveAlt } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router';

const Tickets = (props) => {
    const {id, title, price, image} = props.ticket;
    const history = useHistory();

    const handleClick = (id) =>{
        const url = `/destination/${id}`;
        history.push(url);
    }

    return (
        <Card className='ticket-card' style={{ width: '14rem', height:'16rem',  backgroundImage: "url(" + image + ")"}}>
            <Card.Body>
                <Card.Title style={{color:'white'}}>{title}</Card.Title>
                <Button
                    variant="light"
                    onClick={() => handleClick(id)}
                >Buy Now</Button>
                <Card.Text style={{color:'white'}}><FontAwesomeIcon className='ticket-info-icons' icon={faMoneyBillWaveAlt} />{price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Tickets;