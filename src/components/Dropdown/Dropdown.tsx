import "./Dropdown.css";

interface DropdownProps {
  defaultMessage: string;
  options: { label: string; value: number }[];
  value: number | null;
  handleChangeValue: (value: number) => void;
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
      value={value === null ? undefined : value} // null not allowed value, use undefined
      onChange={(e) => {
        handleChangeValue(parseInt(e.target.value));
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
