import "./Dropdown.css";

interface DropdownProps {
  defaultMessage: string;
  options: { label: string; value: any }[];
}

export const Dropdown = ({ defaultMessage, options }: DropdownProps) => {
  return (
    <select
      className="dropdown"
      defaultValue={defaultMessage}
      // value={defaultMessage}
    >
      <option style={{ display: "none" }}>{defaultMessage}</option>
      {options.map((option) => (
        <option
          data-testid="select-option"
          key={option.label}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};
