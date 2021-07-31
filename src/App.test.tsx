import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("check header text renders with correct text", () => {
  const dom = render(<App />);
  const headerTitle = dom.container.querySelector(".header .title");
  expect(headerTitle?.textContent).toEqual("Address Search");
  const headerSubtitle = dom.container.querySelector(".header .subtitle");
  expect(headerSubtitle?.textContent).toEqual("Please enter your address");
});

test("check main body renders with correct text", () => {
  const dom = render(<App />);
  const addressDurationQuestion = dom.container.querySelector(
    ".address-form-container .sub-heading"
  );
  expect(addressDurationQuestion?.textContent).toEqual(
    "How long have you lived at your current address?"
  );
});

test("check can select year in address duration dropdowns", () => {
  const dom = render(<App />);
  const yearSelect = dom.container.querySelector(
    "#select-address-years .dropdown"
  ) as HTMLSelectElement;
  const options = yearSelect.getElementsByTagName("option");

  expect(yearSelect.value).toEqual("Select years");
  fireEvent.change(yearSelect, { target: { value: 5 } }); // Select last option
  for (let i = 0; i < options.length; i++) {
    if (i === options.length - 1) {
      expect(options[i].selected).toBeTruthy();
    } else {
      expect(options[i].selected).toBeFalsy();
    }
  }
  expect(yearSelect.value).toEqual("5");
});

test("Check can select month in address duration dropdowns", () => {
  const dom = render(<App />);
  const monthSelect = dom.container.querySelector(
    "#select-address-months .dropdown"
  ) as HTMLSelectElement;
  const options = monthSelect.getElementsByTagName("option");

  expect(monthSelect.value).toEqual("Select months");
  fireEvent.change(monthSelect, { target: { value: 11 } }); // Select last option
  for (let i = 0; i < options.length; i++) {
    if (i === options.length - 1) {
      expect(options[i].selected).toBeTruthy();
    } else {
      expect(options[i].selected).toBeFalsy();
    }
  }
  expect(monthSelect.value).toEqual("11");
});
