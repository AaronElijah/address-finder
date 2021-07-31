import "./Dropdown.css";

// const;

export const Dropdown = () => {
  const defaultMessage = "Select years";
  const options = [
    { label: "1 year", value: 1 },
    { label: "2 years", value: 2 },
  ];
  return (
    // <div>
    //   <div className="dropdown-box">
    //     <div className="contents">
    //       <span className="label">{"Hello"}</span>
    //       <span className="toggle-arrow"></span>
    //     </div>
    //   </div>
    //   <div className="dropdown-list">
    //     <ul>
    //       <li>{"1 Year"}</li>
    //     </ul>
    //   </div>
    // </div>
    <select className="dropdown" required>
      <option style={{ display: "none" }} selected>
        {defaultMessage}
      </option>
      {options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};
