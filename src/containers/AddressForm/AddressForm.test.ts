import { getAddressOptions } from "./AddressForm";

test("parse address array into string", () => {
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
