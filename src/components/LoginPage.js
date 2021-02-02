import React from "react";

import "./LoginPage.css";

const LoginPage = (props) => {
  return (
    <div className="login-page">
      <h3>Brainstormy</h3>
      <div>{props.children}</div>
    </div>
  );
};

export default LoginPage;
