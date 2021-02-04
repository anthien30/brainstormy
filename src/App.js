import "./App.css";
import LoginPage from "./components/LoginPage";

import logo from "./logo.svg";
import Canvas from "./components/Canvas";
import Google from "./components/Google";
import Test from "./components/Test";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginPage>
          <Google />
        </LoginPage>
        {/* <Test /> */}
      </header>
    </div>
  );
}

export default App;
