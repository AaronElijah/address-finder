import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const closeModal = () => {
  const modalButton = screen.getByText("Close") as HTMLButtonElement;
  fireEvent.click(modalButton);
};

test("check saved address does not initially appear", () => {
  const dom = render(<App />);
  expect(dom.container.querySelector("#saved-address")).not.toBeInTheDocument();
});

test("check that modal first appears", () => {
  render(<App />);
  expect(screen.getByText("Welcome to Octopus Weath")).toBeInTheDocument();
});

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

// Due to rate limiting on the findAddress.io endpoint, the integration tests were fused into one test.
// Whilst I could've used mocked endpoints, I think the endpoint's range of responses is too unique to mock up sensibily
test("check addresses appear when sucessfully searching postcode", async () => {
  const dom = render(<App />);

  closeModal();

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

  fireEvent.click(
    dom.container.querySelector(
      "#postcode-search .form .search-glass"
    ) as HTMLButtonElement
  );

  await waitFor(() => {
    expect(
      dom.container.querySelector("#select-address-list .dropdown")
    ).toBeInTheDocument();
  });

  // Address is not chosen so address lines are not painted in dom
  expect(
    dom.container.querySelector("#address-lines-block")
  ).not.toBeInTheDocument();

  const addressSelect = dom.container.querySelector(
    "#select-address-list .dropdown"
  ) as HTMLSelectElement;
  fireEvent.change(addressSelect, {
    target: { value: "St. Andrews House,Broadway,,London," },
  });
  expect(addressSelect.value).toEqual("St. Andrews House,Broadway,,London,");

  // Now that address is chosen, expect that the address-lines have now appeared
  expect(
    dom.container.querySelector("#address-lines-block")
  ).toBeInTheDocument();

  // Remove one of the address lines
  // Expect save button to cause modal to appear
  const cityInput = dom.container.querySelector(
    "#address-line-city"
  ) as HTMLInputElement;
  fireEvent.change(cityInput, { target: { value: "" } });

  const saveButton = dom.container.querySelector(
    "#submit-button"
  ) as HTMLButtonElement;
  fireEvent.click(saveButton);

  // Modal should appear with error message
  expect(screen.getByText("Invalid")).toBeInTheDocument();
  closeModal();

  // Check that saved address block doesn't appear
  expect(dom.container.querySelector("#saved-address")).not.toBeInTheDocument();

  // Add address line back in and save address
  fireEvent.change(cityInput, { target: { value: "London" } });
  fireEvent.click(saveButton);

  // Expect the saved address block to appear
  expect(dom.container.querySelector("#saved-address")).toBeInTheDocument();

  // Delete the saved address block
  const deleteButton = dom.container.querySelector(
    ".delete-icon"
  ) as HTMLButtonElement;
  fireEvent.click(deleteButton);

  // Expect the saved address block to disappear
  expect(dom.container.querySelector("#saved-address")).not.toBeInTheDocument();
});
