import "./Dropdown.css";

interface DropdownProps {
  defaultMessage: string;
  options: { label: string; value: any }[];
  value: any;
  handleChangeValue: (value: any) => void;
}

export const Dropdown = ({
  defaultMessage,
  options,
  value,
  handleChangeValue,
}: DropdownProps) => {
  return (
    <select
      className="dropdown"
      value={value === null ? "" : value} // null not allowed value, use empty string
      onChange={(e) => {
        handleChangeValue(e.target.value);
      }}
    >
      <option key={"none"} value={undefined} style={{ display: "none" }}>
        {defaultMessage}
      </option>
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
