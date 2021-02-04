import React, { useState } from "react";
import Login from "./Login";
import Logout from "./Logout";
import { Link } from "react-router-dom";

export default function Google() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState();

  return (
    <div>
      {!loggedIn && (
        <Login
          loggedIn={loggedIn}
          setLoggedIn={(bool) => setLoggedIn(bool)}
          setName={(name) => setName(name)}
        />
      )}
      {loggedIn ? <p>Hello {name}</p> : <p>Not logged in</p>}
      {loggedIn && (
        <div>
          <Link to="/draw">Go to Drawing</Link>
          <hr />
          <Logout
            loggedIn={loggedIn}
            setLoggedIn={(bool) => setLoggedIn(bool)}
          />
        </div>
      )}
    </div>
  );
}
