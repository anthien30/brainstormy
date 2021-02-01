import logo from "./logo.svg";
import "./App.css";
import Canvas from "./components/Canvas.js";
import LoginPage from "./components/LoginPage";
import RandomName from "./components/LoginPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Canvas /> */}
        <LoginPage />
      </header>
    </div>
  );
}

export default App;
