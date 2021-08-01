import { useContext, useReducer } from "react";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { InputSearch } from "../../components/InputSearch/InputSearch";
import { Context } from "../../context/Context";
import { fetchAddress } from "./fetchAddress";
import { actionTypes, AddressFormStateType, reducer } from "./reducer";
import { actionTypes as contextActionTypes } from "../../context/reducer";

const yearOptions = Array.from({ length: 6 }, (_, i) => ({
  value: i,
  label: `${i} ${i === 1 ? "year" : "years"}`,
}));

const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  value: i,
  label: `${i} ${i === 1 ? "month" : "months"}`,
}));

const initialAddressFormState: AddressFormStateType = {
  years: null,
  months: null,
  postcode: null,
  addresses: [],
  chosenAddress: null,
};

export const getAddressOptions = (addresses: string[][]) => {
  return addresses.map((address) => ({
    label:
      address.reduce((label, line) =>
        line.length > 0 ? label + ", " + line : label + ""
      ) + ", UK",
    value: address,
  }));
};

const isPostcodeDisabled = (state: AddressFormStateType) =>
  state.years === null || state.months === null;

export const AddressForm = () => {
  const [state, dispatch] = useReducer(reducer, initialAddressFormState);
  const contextDispatch = useContext(Context);

  const setModal = (title: string, subheading: string) => {
    contextDispatch({
      type: contextActionTypes.updateModal,
      payload: {
        isVisible: true,
        title: title,
        subheading: subheading,
      },
    });
  };
  return (
    <div className="address-form-container">
      <div className="sub-heading">
        {"How long have you lived at your current address?"}
      </div>
      <div id="duration-answers">
        <span id="select-address-years">
          <Dropdown
            defaultMessage="Select years"
            options={yearOptions}
            value={state.years}
            handleChangeValue={(newValue: string) =>
              dispatch({
                type: actionTypes.updateYears,
                payload: { newValue: parseInt(newValue) },
              })
            }
          />
        </span>
        <span id="select-address-months">
          <Dropdown
            defaultMessage="Select months"
            options={monthOptions}
            value={state.months}
            handleChangeValue={(newValue: string) =>
              dispatch({
                type: actionTypes.updateMonths,
                payload: { newValue: parseInt(newValue) },
              })
            }
          />
        </span>
      </div>
      <div className="sub-heading">{"Postcode search"}</div>
      <div id="postcode-search">
        <InputSearch
          value={state.postcode}
          placeholder={"Enter postcode"}
          disabled={isPostcodeDisabled(state)}
          handleChange={(newValue: string) =>
            dispatch({
              type: actionTypes.updatePostcode,
              payload: { newValue: newValue },
            })
          }
          handleSearch={async () => {
            if (!!state.postcode) {
              const addresses = await fetchAddress(state.postcode, setModal);
              if (addresses !== undefined) {
                dispatch({
                  type: actionTypes.setAddresses,
                  payload: { addresses: addresses },
                });
              }
            }
          }}
        />
      </div>
      {state.addresses.length > 0 ? (
        <div style={{ width: "100%" }}>
          <div className="sub-heading">{"Address"}</div>
          <span id="select-address">
            <Dropdown
              defaultMessage="Select your address"
              options={getAddressOptions(state.addresses)}
              value={state.chosenAddress}
              handleChangeValue={(newAddress: string[]) => {
                console.log(newAddress);
                dispatch({
                  type: actionTypes.setChosenAddress,
                  payload: { address: newAddress },
                });
              }}
            />
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
