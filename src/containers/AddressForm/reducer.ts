export type Address = {
  line1: string;
  line2: string;
  line3: string;
  city: string;
  county: string;
};

export type AddressWithPostcode = Address & {
  postcode: string;
};

export type SavedAddress = AddressWithPostcode & {
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
  updateChosenAddress = "update/chosenaddress",
  saveAddress = "save/address",
  deleteAddress = "delete/address",
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

export interface UpdateChosenAddressAction {
  type: actionTypes.updateChosenAddress;
  payload: Record<string, string>;
}

export interface SaveAddressAction {
  type: actionTypes.saveAddress;
}

export interface DeleteAddressAction {
  type: actionTypes.deleteAddress;
}

type AddressFormActionType =
  | UpdateYearsAction
  | UpdateMonthsAction
  | UpdatePostcodeAction
  | SetAddressesAction
  | SetChosenAddressAction
  | UpdateChosenAddressAction
  | SaveAddressAction
  | DeleteAddressAction;

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
    case actionTypes.updateChosenAddress:
      const { postcode, ...otherAddress } = action.payload;
      const newPostcode = postcode !== undefined ? postcode : state.postcode;
      const definedNewAddress: any = Object.keys(otherAddress).reduce(
        (newAddress: Record<string, string>, key) => {
          if (otherAddress[key] !== undefined) {
            newAddress[key] = otherAddress[key];
          }
          return newAddress;
        },
        {}
      );
      return {
        ...state,
        chosenAddress: { ...state.chosenAddress, ...definedNewAddress },
        postcode: newPostcode,
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
    case actionTypes.deleteAddress:
      return { ...state, savedAddress: null };
    default:
      return state;
  }
};
