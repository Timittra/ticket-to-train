/* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef } from 'react';
import { UserContext } from '../../App';
import firebase from 'firebase/app';
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useHistory, useLocation } from 'react-router';
import GoogleImage from '../../images/google.png';
import {useForm} from "react-hook-form";
import './Login.css';

const Login = () => {
    let [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const history = useHistory();
    const location = useLocation();

    const { register, errors, watch } = useForm({});
    const password = useRef({});

    const { from } = location.state || { from: { pathname: "/" } };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      } else {
        firebase.app();
      }

      const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
    
        firebase.auth().signInWithPopup(provider)
          .then((result) => {
            const { displayName, email } = result.user;
            const signedInUser = {
              name: displayName,
              email: email
            }
            setLoggedInUser(signedInUser);
            history.replace(from);
          }).catch((error) => {
            const errorMessage = error.message;
            console.log('Google sign in error', errorMessage);
          });
      }

         
      const handleBlur = (e) => {
        let isFieldValid = true;
    
        if(e.target.name === 'email'){
          isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === 'password'){
          const isPasswordValid = e.target.value.length > 7 ;
          isFieldValid = isPasswordValid;
        }
        if(isFieldValid){
          const newUserInfo = {...loggedInUser}; // 1
          newUserInfo[e.target.name] = e.target.value;
          setLoggedInUser(newUserInfo);
        }
      }


  const handleSubmit = (e) => {
    if (newUser && loggedInUser.email && loggedInUser.password) {
      firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
      .then((res) => {
        const newUserInfo = {...loggedInUser}; //
        newUserInfo.error = '';
        newUserInfo.success = true; 
        newUserInfo.isSignedIn = true;
        setLoggedInUser(newUserInfo);
        history.replace(from);
        updateUserName(loggedInUser.name);
      })
      .catch((error) => {
        const newUserInfo = {...loggedInUser}; //
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setLoggedInUser(newUserInfo);
      });
    }
    if (!newUser && loggedInUser.email && loggedInUser.password) {
      firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
        .then((res) => {
          const newUserInfo = {...loggedInUser}; //
          newUserInfo.error = '';
          newUserInfo.success = true;
          newUserInfo.isSignedIn = true;
          setLoggedInUser(newUserInfo);
          history.replace(from);
          updateUserName(loggedInUser.name);
        })
        .catch((error) => {
          const newUserInfo = {...loggedInUser}; //
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setLoggedInUser(newUserInfo);
        });
  }
  e.preventDefault();
}


const updateUserName = name => {
  var user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
  }).then(function () {
    console.log('user name updated successfully.');
  }).catch(function (error) {
    console.log(error);
  });
}


 return (
        <div className='login'>

            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" className='check-box'/>
            { newUser ? <label htmlFor="newUser">Already have an account? Log in</label> :
                <label htmlFor="newUser">Don't have an account? Create an account</label>}

            <form onSubmit={handleSubmit}>
                {newUser ? <h3>Create an account</h3> : <h3>Log in</h3>}
                {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder='name' />}
                <br />

                <input type="text" name='email' onBlur={handleBlur} placeholder="Username or Email" required />
                <br />
                
                <input type="password" name="password" onBlur={handleBlur} placeholder='Password' 
                ref={register({
                  required: "You must specify a password",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 7 character and one number"
                  }
                })}
                 />
                <br />

                {newUser && <input className='confirm-pass' type="password" name="confirm_password" onBlur={handleBlur} placeholder='Confirm Password'
                 ref={register({
                  validate: value =>
                    value === password.current || "The passwords do not match"
                })}
                 /> 
                 }

                <br />

                {errors.confirm_password && <p>{errors.confirm_password.message}</p>}

                <input className='button-login' type="submit" value={newUser ? 'Create an account' : 'Log in'} />

            </form>
            <p style={{ color: 'red' }}>{loggedInUser.error}</p>
            {
                loggedInUser.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully.</p>
            }

            <p>
            <span onClick={handleGoogleSignIn} className='google-login'><img className='google-img' src={`${GoogleImage}`} alt=''/>
             Continue with Google</span>
            </p>
            
            

        </div>
    );
};

export default Login;