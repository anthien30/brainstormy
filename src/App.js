import logo from "./logo.svg";
import "./App.css";
import Canvas from "./components/Canvas";
import Google from "./components/Google";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginPage>
          <Google />
        </LoginPage>
      </header>
    </div>
  );
}

export default App;
