import { BroswerRouter, Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";

import Google from "./components/Google";
import Test from "./components/Test";
function App() {
  return (
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
            <Route path="/draw" exact component={Test} />
          </Switch>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
