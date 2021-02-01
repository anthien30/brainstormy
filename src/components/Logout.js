import React, { useState } from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = '31511364762-af73a2fcq1v6mgufrd5otqem4j5ksdi8.apps.googleusercontent.com' //insert client id here

function Logout(props) {

  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
    props.setLoggedIn(false);
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;