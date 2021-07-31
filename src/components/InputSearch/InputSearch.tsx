import React from "react";
import "./InputSearch.css";

interface InputSearchProps {
  placeholder: string;
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const InputSearch = ({
  placeholder,
  inputValue,
  onInputChange,
  onSearch,
}: InputSearchProps) => {
  return (
    <form className="form">
      <input
        type="text"
        placeholder={placeholder}
        className="input"
        value={inputValue}
        onChange={onInputChange}
      ></input>
      <button className="search-glass" onClick={onSearch}></button>
    </form>
  );
};
