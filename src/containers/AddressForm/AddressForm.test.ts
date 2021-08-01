import { getAddressArray, getAddressOptions } from "./AddressForm";
import { Address } from "./reducer";

test("parse address array to string", () => {
  const addresses = [
    ["1 test lane", "test street", "test area", "test city", "test county"],
  ];

  expect(getAddressOptions(addresses)).toEqual([
    {
      label: "1 test lane, test street, test area, test city, test county, UK",
      value: [
        "1 test lane",
        "test street",
        "test area",
        "test city",
        "test county",
      ],
    },
  ]);
});

test("parse address object into address array", () => {
  const address: Address = {
    line1: "1 test lane",
    line2: "test street",
    line3: "test area",
    city: "test city",
    county: "test county",
  };
  expect(getAddressArray(address)).toEqual([
    "1 test lane",
    "test street",
    "test area",
    "test city",
    "test county",
  ]);
});
