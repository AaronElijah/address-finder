import React from "react";
import { AddressFormActionType, ContextType } from "./reducer";

export const initialContext: ContextType = {
  modal: {
    isVisible: true,
    title: "Welcome to Octopus Weath",
    subheading: "Please fill in your address details",
  },
};

export const Context = React.createContext<
  React.Dispatch<AddressFormActionType>
>(() => {});
