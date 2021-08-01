export interface ContextType {
  modal: { title: string; subheading: string; isVisible: boolean };
}

export enum actionTypes {
  updateModal = "update/modal",
}

export interface UpdateModalAction {
  type: actionTypes.updateModal;
  payload: { isVisible?: boolean; title?: string; subheading?: string };
}

export type AddressFormActionType = UpdateModalAction;

export const reducer = (state: ContextType, action: AddressFormActionType) => {
  switch (action.type) {
    case actionTypes.updateModal:
      return { ...state, modal: { ...state.modal, ...action.payload } };
    default:
      return state;
  }
};
