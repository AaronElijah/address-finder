import React from "react";
import { AddressFormActionType, ContextType } from "./reducer";

export const initialContext: ContextType = {
  modal: { isVisible: true, title: "Test", subheading: "This is a test" },
};

export const Context =
  React.createContext<React.Dispatch<AddressFormActionType> | null>(null);
