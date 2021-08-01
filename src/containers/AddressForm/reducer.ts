export type Address = {
  line1: string;
  line2: string;
  line3: string;
  city: string;
  county: string;
};

type SavedAddress = Address & {
  postcode: string;
  years: number;
  months: number;
};

export interface AddressFormStateType {
  years: number | null;
  months: number | null;
  postcode: string | null;
  addresses: string[][];
  chosenAddress: Address | null;
  savedAddress: SavedAddress | null;
}

export enum actionTypes {
  updateYears = "update/years",
  updateMonths = "update/months",
  updatePostcode = "update/postcode",
  setAddresses = "set/addresses",
  setChosenAddress = "set/chosenaddress",
  saveAddress = "save/address",
}

export interface UpdateYearsAction {
  type: actionTypes.updateYears;
  payload: { newValue: number };
}

export interface UpdateMonthsAction {
  type: actionTypes.updateMonths;
  payload: { newValue: number };
}

export interface UpdatePostcodeAction {
  type: actionTypes.updatePostcode;
  payload: { newValue: string };
}

export interface SetAddressesAction {
  type: actionTypes.setAddresses;
  payload: { addresses: string[][] };
}
export interface SetChosenAddressAction {
  type: actionTypes.setChosenAddress;
  payload: { addressOption: string };
}

export interface SaveAddressAction {
  type: actionTypes.saveAddress;
}

type AddressFormActionType =
  | UpdateYearsAction
  | UpdateMonthsAction
  | UpdatePostcodeAction
  | SetAddressesAction
  | SetChosenAddressAction
  | SaveAddressAction;

export const reducer = (
  state: AddressFormStateType,
  action: AddressFormActionType
): AddressFormStateType => {
  switch (action.type) {
    case actionTypes.updateYears:
      return { ...state, years: action.payload.newValue };
    case actionTypes.updateMonths:
      return { ...state, months: action.payload.newValue };
    case actionTypes.updatePostcode:
      return { ...state, postcode: action.payload.newValue };
    case actionTypes.setAddresses:
      return { ...state, addresses: action.payload.addresses };
    case actionTypes.setChosenAddress:
      const addressParts = action.payload.addressOption.split(",");
      return {
        ...state,
        chosenAddress: {
          line1: addressParts[0],
          line2: addressParts[1],
          line3: addressParts[2],
          city: addressParts[3],
          county: addressParts[4],
        },
      };
    case actionTypes.saveAddress:
      return {
        ...state,
        postcode: null,
        years: null,
        months: null,
        chosenAddress: null,
        addresses: [],
        savedAddress: {
          postcode: state.postcode as string,
          years: state.years as number,
          months: state.months as number,
          line1: state.chosenAddress?.line1 as string,
          line2: state.chosenAddress?.line2 as string,
          line3: state.chosenAddress?.line3 as string,
          city: state.chosenAddress?.city as string,
          county: state.chosenAddress?.county as string,
        },
      };
    default:
      return state;
  }
};
