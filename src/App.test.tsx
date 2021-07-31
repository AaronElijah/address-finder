import { render, screen, cleanup } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

test("check header text renders with correct text", () => {
  const dom = render(<App />);
  const headerTitle = dom.container.querySelector(".App-header .title");
  expect(headerTitle?.textContent).toEqual("Address Search");
  const headerSubtitle = dom.container.querySelector(".App-header .subtitle");
  expect(headerSubtitle?.textContent).toEqual("Please enter your address");
});
