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

const getAddressOptions = (addresses: string[][]) => {
  return addresses.map((address) => ({
    label: address.join(", "),
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
            handleChangeValue={(newValue: number) =>
              dispatch({
                type: actionTypes.updateYears,
                payload: { newValue: newValue },
              })
            }
          />
        </span>
        <span id="select-address-months">
          <Dropdown
            defaultMessage="Select months"
            options={monthOptions}
            value={state.months}
            handleChangeValue={(newValue: number) =>
              dispatch({
                type: actionTypes.updateMonths,
                payload: { newValue: newValue },
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
              dispatch({
                type: actionTypes.setAddresses,
                payload: { addresses: addresses },
              });
            }
          }}
        />
      </div>
      {state.addresses.length > 0 ? (
        <>
          <div className="sub-heading">{"Address"}</div>
          <Dropdown
            defaultMessage="Select your address"
            options={getAddressOptions(state.addresses)}
            value={state.chosenAddress?.join(" ") ?? null}
            handleChangeValue={(newAddress: string[]) => {
              dispatch({
                type: actionTypes.setChosenAddress,
                payload: { address: newAddress },
              });
            }}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
