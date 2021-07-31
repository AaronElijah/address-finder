import React, { useState } from "react";
import { InputSearch as InputSearchView } from "../../components/InputSearch/InputSearch";

interface InputSearchContainerProps {
  placeholder: string;
  //   handleSearch: (value: string) => void;
}

export const InputSearch = ({ placeholder }: InputSearchContainerProps) => {
  const [input, setInput] = useState("");
  const handleSearch = (value: string) => {
    console.log(value);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value.length <= 8) {
      setInput(e.target.value);
    }
  };
  const onSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSearch(input);
  };
  return (
    <InputSearchView
      placeholder={placeholder}
      inputValue={input}
      onInputChange={onInputChange}
      onSearch={onSearch}
    />
  );
};
