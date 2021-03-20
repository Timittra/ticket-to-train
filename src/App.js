/* eslint-disable no-unused-vars */
import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Destination from './components/Destination/Destination';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import fakeData from './fakeData/fakeData';

export const UserContext = createContext();

function App() {

  let [loggedInUser, setLoggedInUser] = useState({
    isSignedIn : false,
    name: '',
    email: '',
    password: '', 
    confirmPassword: ''
  });

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header />

        <Switch>
          <Route path='/home'>
            <Home></Home>
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          
          <PrivateRoute path='/destination/:id'>
            <Destination/>
          </PrivateRoute>
          <Route exact path="/">
            <Home></Home>
          </Route>
        </Switch>

      </Router>
    </UserContext.Provider>
  );
}

export default App;
