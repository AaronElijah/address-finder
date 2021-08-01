import React from "react";
import "./InputSearch.css";

interface InputSearchViewProps {
  placeholder: string;
  inputValue: string | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

export const InputSearchView = ({
  placeholder,
  inputValue,
  onInputChange,
  onSearch,
  disabled,
}: InputSearchViewProps) => {
  return (
    <form className="form">
      <input
        type="text"
        placeholder={placeholder}
        className="input"
        value={inputValue === null ? "" : inputValue}
        onChange={onInputChange}
        disabled={disabled}
      ></input>
      <button
        className="search-glass"
        onClick={onSearch}
        disabled={disabled}
      ></button>
    </form>
  );
};
