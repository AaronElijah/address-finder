import { useContext, useReducer } from "react";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { InputSearch } from "../../components/InputSearch/InputSearch";
import { Context } from "../../context/Context";
import { fetchAddress } from "./fetchAddress";
import {
  actionTypes,
  Address,
  AddressFormStateType,
  reducer,
  SavedAddress,
} from "./reducer";
import { actionTypes as contextActionTypes } from "../../context/reducer";
import "./AddressForm.css";

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
  savedAddress: null,
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

export const getAddressArray = (address: Address) => {
  return [
    address.line1,
    address.line2,
    address.line3,
    address.city,
    address.county,
  ];
};

export const getAddressDisplay = (savedAddress: SavedAddress) => {
  return `${savedAddress.line1}, ${savedAddress.line2}, ${savedAddress.city}, ${savedAddress.postcode}`;
};

const isPostcodeDisabled = (state: AddressFormStateType) =>
  state.years === null || state.months === null;

const isSaveButtonDisabled = (state: AddressFormStateType) =>
  state.chosenAddress?.line1 === "" ||
  state.chosenAddress?.line2 === "" ||
  state.chosenAddress?.city === "" ||
  state.postcode === "";

interface AddressFormProps {
  isDisabled: boolean;
}

export const AddressForm = ({ isDisabled }: AddressFormProps) => {
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

  const handleChangePostcode = (newValue: string) => {
    dispatch({
      type: actionTypes.updatePostcode,
      payload: { newValue: newValue },
    });
  };

  return (
    <div className={`address-form-container ${isDisabled ? "disabled" : ""}`}>
      {state.savedAddress !== null ? (
        <div id="saved-address">
          <div className="lines">
            <div>{getAddressDisplay(state.savedAddress)}</div>
            <button
              className="delete-icon button-hover"
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: actionTypes.deleteAddress });
              }}
            ></button>
          </div>
          <div className="lines">
            <div>{`Time at address: ${state.savedAddress.years} ${
              state.savedAddress.years === 1 ? "year" : "years"
            }, ${state.savedAddress.months} ${
              state.savedAddress.months === 1 ? "month" : "months"
            }`}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
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
          handleChange={handleChangePostcode}
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
        <div className="select-address">
          <div className="sub-heading">{"Address"}</div>
          <span id="select-address-list">
            <Dropdown
              defaultMessage="Select your address"
              options={getAddressOptions(state.addresses)}
              value={
                state.chosenAddress !== null
                  ? getAddressArray(state.chosenAddress)
                  : null
              }
              handleChangeValue={(newAddress: string) => {
                dispatch({
                  type: actionTypes.setChosenAddress,
                  payload: { addressOption: newAddress },
                });
              }}
            />
          </span>
        </div>
      ) : (
        <></>
      )}
      {state.chosenAddress !== null && state.postcode !== null ? (
        <div id="address-lines-block">
          <div id="double-chevron"></div>
          <div className="sub-heading">{"Address Line 1*"}</div>
          <input
            id="address-line-1"
            className="address-lines"
            value={state.chosenAddress.line1}
            onChange={(e) => {
              e.preventDefault();
              dispatch({
                type: actionTypes.updateChosenAddress,
                payload: { line1: e.target.value },
              });
            }}
          />
          <div className="sub-heading">{"Address Line 2*"}</div>
          <input
            id="address-line-2"
            className="address-lines"
            value={state.chosenAddress.line2}
            onChange={(e) => {
              e.preventDefault();
              dispatch({
                type: actionTypes.updateChosenAddress,
                payload: { line2: e.target.value },
              });
            }}
          />
          <div className="sub-heading">{"City*"}</div>
          <input
            id="address-line-city"
            className="address-lines"
            value={state.chosenAddress.city}
            onChange={(e) => {
              e.preventDefault();
              dispatch({
                type: actionTypes.updateChosenAddress,
                payload: { city: e.target.value },
              });
            }}
          />
          <div className="sub-heading">{"Postcode*"}</div>
          <input
            id="address-line-postcode"
            className="address-lines"
            value={state.postcode}
            onChange={(e) =>
              dispatch({
                type: actionTypes.updatePostcode,
                payload: { newValue: e.target.value },
              })
            }
          />
          <button
            id="submit-button"
            onClick={() => {
              if (!isSaveButtonDisabled(state)) {
                dispatch({ type: actionTypes.saveAddress });
              } else {
                setModal("Invalid", "Please fill in all address form");
              }
            }}
          >
            {"Add address"}
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
