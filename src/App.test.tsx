import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

test("check that you can't enter postcode before inputting address duration", () => {
  const dom = render(<App />);
  const postcodeSearch = dom.container.querySelector("#postcode-search");
  const postcodeSearchInput = postcodeSearch?.getElementsByClassName(
    "input"
  )[0] as HTMLInputElement;
  expect(postcodeSearchInput.value).toEqual("");
  userEvent.type(postcodeSearchInput, "NN40 5AYakjsdfkljasd");
  expect(postcodeSearchInput.value).toEqual("");
});

test("check can enter and search postcode with maximum 8 chars when months and years are valid", () => {
  const dom = render(<App />);

  const monthSelect = dom.container.querySelector(
    "#select-address-months .dropdown"
  ) as HTMLSelectElement;
  fireEvent.change(monthSelect, { target: { value: 11 } }); // Select last option

  const yearSelect = dom.container.querySelector(
    "#select-address-years .dropdown"
  ) as HTMLSelectElement;
  fireEvent.change(yearSelect, { target: { value: 5 } }); // Select last option

  const postcodeSearch = dom.container.querySelector("#postcode-search");
  const postcodeSearchInput = postcodeSearch?.getElementsByClassName(
    "input"
  )[0] as HTMLInputElement;
  expect(postcodeSearchInput.value).toEqual("");
  userEvent.type(postcodeSearchInput, "NN40 5AYakjsdfkljasd");
  expect(postcodeSearchInput.value).toEqual("NN40 5AY");
});

test("check addresses appear when sucessfully searching postcode", () => {
  const dom = render(<App />);

  const monthSelect = dom.container.querySelector(
    "#select-address-months .dropdown"
  ) as HTMLSelectElement;
  fireEvent.change(monthSelect, { target: { value: 11 } }); // Select last option

  const yearSelect = dom.container.querySelector(
    "#select-address-years .dropdown"
  ) as HTMLSelectElement;
  fireEvent.change(yearSelect, { target: { value: 5 } }); // Select last option

  const postcodeSearch = dom.container.querySelector("#postcode-search");
  const postcodeSearchInput = postcodeSearch?.getElementsByClassName(
    "input"
  )[0] as HTMLInputElement;
  userEvent.type(postcodeSearchInput, "SW1H 0BT");
  userEvent.type(postcodeSearchInput, "{enter}");

  const;
});
