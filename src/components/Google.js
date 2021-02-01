import React, {useState} from 'react'
import Login from './Login';
import Logout from './Logout';

//npm i react-google-login

export default function Google() {
    
  const [loggedIn, setLoggedIn] = useState(false)
  const [name,setName] = useState()

    return (
        <div>
            <Login loggedIn={loggedIn} setLoggedIn = {(bool) => setLoggedIn(bool)} setName={(name) =>setName(name)}/>
            {loggedIn ? <p>Hello {name}</p> : <p>Not logged in</p>}
            <Logout loggedIn={loggedIn} setLoggedIn = {(bool) => setLoggedIn(bool)}/>
        </div>
    )
}
