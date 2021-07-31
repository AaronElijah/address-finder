export interface ContextType {
  modal: { title: string; subheading: string; isVisible: boolean };
}

interface UpdateModalVisibility {
  type: "update/modal";
  payload: { isVisible?: boolean; title?: string; subheading?: string };
}

export type AddressFormActionType = UpdateModalVisibility;

export const reducer = (state: ContextType, action: AddressFormActionType) => {
  switch (action.type) {
    case "update/modal":
      return { ...state, modal: { ...state.modal, ...action.payload } };
    default:
      return state;
  }
};
