import React from "react";
import { InputSearchView } from "./InputSearchView";

interface InputSearchProps {
  value: string | null;
  placeholder: string;
  disabled: boolean;
  handleChange: (value: string) => void;
  handleSearch: () => void;
}

export const InputSearch = ({
  value,
  placeholder,
  disabled,
  handleChange,
  handleSearch,
}: InputSearchProps) => {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value.length <= 8) {
      // no postcode longer than 8 characters
      handleChange(e.target.value);
    }
  };
  const onSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSearch();
  };
  return (
    <InputSearchView
      placeholder={placeholder}
      inputValue={value}
      onInputChange={onInputChange}
      onSearch={onSearch}
      disabled={disabled}
    />
  );
};
