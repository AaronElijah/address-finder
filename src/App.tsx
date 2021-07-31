import "./App.css";
import { Header } from "./components/Header/Header";
import { Dropdown } from "./components/Dropdown/Dropdown";

function App() {
  return (
    <div className="App">
      <Header title="Address Search" subtitle="Please enter your address" />
      <div className="App-main">
        <div className="address-form-container">
          <div className="sub-heading">
            {"How long have you lived at your current address?"}
          </div>
          <div className="duration-answers">
            <span>
              <Dropdown />
            </span>
            <span>
              <Dropdown />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
