import { Switch, Route, BrowserRouter } from "react-router-dom";
import React, { useState } from 'react'
import "./App.css";
import LoginPage from "./components/LoginPage";
import firebase from 'firebase/app';
import Google from "./components/Google";
import CanvasContainer from "./components/CanvasContainer";
import Store from './Store'



function App() {
  return (
    <Store>
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
            <Switch>
              <Route
                path="/"
                exact
                component={() => (
                  <LoginPage>   
                    <Google />
                  </LoginPage>
                )}
              />
              <Route path="/draw" exact component={CanvasContainer} />
            </Switch>
        </header>
      </div>
    </BrowserRouter>
    </Store>
  );
}

export default App;
