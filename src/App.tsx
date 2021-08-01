import { useReducer } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { AddressForm } from "./containers/AddressForm/AddressForm";
import { Modal } from "./components/Modal/Modal";
import { Context } from "./context/Context";
import { reducer as contextReducer } from "./context/reducer";
import { initialContext } from "./context/Context";

function App() {
  const [context, dispatch] = useReducer(contextReducer, initialContext);
  return (
    <Context.Provider value={dispatch}>
      <div className="App">
        <Header title="Address Search" subtitle="Please enter your address" />
        <div className="App-main">
          <AddressForm />
        </div>
        <Modal
          isVisible={context.modal.isVisible}
          content={{
            title: context.modal.title,
            subheading: context.modal.subheading,
          }}
        />
      </div>
    </Context.Provider>
  );
}

export default App;
