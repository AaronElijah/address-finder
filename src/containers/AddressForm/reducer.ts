export interface AddressFormStateType {
  years: number | null;
  months: number | null;
  postcode: string | null;
  addresses: string[][];
  chosenAddress: string[] | null;
}

export enum actionTypes {
  updateYears = "update/years",
  updateMonths = "update/months",
  updatePostcode = "update/postcode",
  setAddresses = "set/addresses",
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

type AddressFormActionType =
  | UpdateYearsAction
  | UpdateMonthsAction
  | UpdatePostcodeAction
  | SetAddressesAction;

export const reducer = (
  state: AddressFormStateType,
  action: AddressFormActionType
) => {
  switch (action.type) {
    case actionTypes.updateYears:
      return { ...state, years: action.payload.newValue };
    case actionTypes.updateMonths:
      return { ...state, months: action.payload.newValue };
    case actionTypes.updatePostcode:
      return { ...state, postcode: action.payload.newValue };
    case actionTypes.setAddresses:
      return { ...state, addresses: action.payload.addresses };
    default:
      return state;
  }
};
