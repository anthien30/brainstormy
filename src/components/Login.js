import React, { useState, useContext } from 'react'
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';
import { Context } from '../Store'
import { firebase, db } from './FirebaseConfig'


const clientId = '31511364762-af73a2fcq1v6mgufrd5otqem4j5ksdi8.apps.googleusercontent.com' //insert client id here

function Login(props) {

  const [state, dispatch] = useContext(Context);
  let avaliableCanvasId;
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    //If new data, assign the canvas Id to the new user
    const setNewData = () => {
      firebase.database().ref('board/' + res.profileObj.googleId).set({
        x1: 0,
        y1: 0,
        x2: -1,
        y2: -1,
        isDrawing: false,
        colorHexCode: "#000000",
        canvasId: avaliableCanvasId
      }, (error) => { alert(`Write failed to ${res.profileObj.googleId}`) })
      firebase.database().ref('board/currentAvaliableCanvas').set(firebase.database.ServerValue.increment(1))
      dispatch({ type: 'setCanvasId', obj: avaliableCanvasId });
    }
    //If old data, update the data
    const updateOldData = () => {
      firebase.database().ref('board/' + res.profileObj.googleId).update({
        x1: 0,
        y1: 0,
        x2: -1,
        y2: -1,
        isDrawing: false,
        colorHexCode: "#000000",
      })
    }
    alert(
      `Logged in successfully! Welcome ${res.profileObj.name} 😍.`
    );
    refreshTokenSetup(res);
    props.setLoggedIn(true);
    props.setName(res.profileObj.givenName)
    dispatch({ type: 'setObj', obj: res.profileObj });
    dispatch({ type: 'setColorHexCode', obj: "#000000" });
    console.log("googleID is  " + state.googleObj.googleId)

    //Initialize database data when logged in
    firebase.database().ref('board/' + res.profileObj.googleId).once("value", snapshot => {
      if (snapshot.exists()) {
        updateOldData();
        //Set global store state canvasId to the canvasId of user
        dispatch({ type: 'setCanvasId', obj: snapshot.val().canvasId });
      } else {
        //Get the value for currentAvaliable Canvas.  Then setNewData based on the currentAvaliable Canvas
        firebase.database().ref('board/').once("value", (snapshot) => {
          avaliableCanvasId = snapshot.val().currentAvaliableCanvas;
        }, (error) => alert("undefined")).then(setNewData).catch((err) => alert(err))
      }
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