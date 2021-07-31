import { render, screen, cleanup } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

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
