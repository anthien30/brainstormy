import React, { useState, useContext} from 'react'
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';
import {Context} from '../Store'
import {firebase, db} from './FirebaseConfig'


const clientId = '31511364762-af73a2fcq1v6mgufrd5otqem4j5ksdi8.apps.googleusercontent.com' //insert client id here

function Login(props) {

  const [state,dispatch] = useContext(Context);

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);

    alert(
      `Logged in successfully! Welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
    refreshTokenSetup(res);
    props.setLoggedIn(true);
    props.setName(res.profileObj.givenName)
    dispatch({type: 'setObj', obj: res.profileObj}); 
    console.log("googleID is  " + state.googleObj.googleId)

    //Initialize database data when logged in
    firebase.database().ref('board/' + res.profileObj.GoogleId).set({
      x1: 0,
      y1: 0,
      x2: -1,
      y2: -1,
      isDrawing: false
    })
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login 😢. Please try again`
    );
  };

  return (

    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;