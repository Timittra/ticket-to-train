import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import BannerImg from '../../images/banner.jpg';
import fakeData from '../../fakeData/fakeData';
import Tickets from '../Tickets/Tickets';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 3,
      display: 'flex',
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

const Home = () => {
    const [tickets, setTickets] = useState([]);
    const classes = useStyles();

    useEffect (() =>{
      setTickets(fakeData);
    },[]);

    const bannerStyle = {
        backgroundImage: "url(" + BannerImg + ")",
        backgroundPosition:" center center",
        backgroundSize: "100% 100%",
        height: '1350px',
        width:"100%"
    }
    return (
        <div style={bannerStyle}>
        <Container maxWidth='lg'>
            <Grid container className={classes.root} spacing={1}>
                {tickets.map((ticket) => (
                    <Grid xs={12} sm={6} md={3} lg={3} key={ticket.id} item>
                        <Tickets ticket={ticket} />
                    </Grid>
                ))}
            </Grid>
        </Container>
        </div>
    );
};

export default Home;