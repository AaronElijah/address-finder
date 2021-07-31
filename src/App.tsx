import "./App.css";
import { Header } from "./components/Header/Header";
import { Dropdown } from "./components/Dropdown/Dropdown";
import { InputSearch } from "./components/InputSearch/InputSearch";

const yearOptions = Array.from({ length: 6 }, (_, i) => ({
  value: i,
  label: `${i} ${i === 1 ? "year" : "years"}`,
}));

const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  value: i,
  label: `${i} ${i === 1 ? "month" : "months"}`,
}));

function App() {
  return (
    <div className="App">
      <Header title="Address Search" subtitle="Please enter your address" />
      <div className="App-main">
        <div className="address-form-container">
          <div className="sub-heading">
            {"How long have you lived at your current address?"}
          </div>
          <div id="duration-answers">
            <span id="select-address-years">
              <Dropdown defaultMessage="Select years" options={yearOptions} />
            </span>
            <span id="select-address-months">
              <Dropdown defaultMessage="Select months" options={monthOptions} />
            </span>
          </div>
          <div className="sub-heading">{"Postcode search"}</div>
          <div id="postcode-search">
            <InputSearch />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
