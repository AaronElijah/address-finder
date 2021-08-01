import {
  reducer,
  actionTypes,
  UpdatePostcodeAction,
  UpdateMonthsAction,
  UpdateYearsAction,
  SetAddressesAction,
} from "./reducer";

describe("unit test reducer updates address durations", () => {
  const initial = {
    years: null,
    months: null,
    postcode: null,
    addresses: [],
  };
  test("update address duration years", () => {
    const addressYearsAction: UpdateYearsAction = {
      type: actionTypes.updateYears,
      payload: { newValue: 1 },
    };
    const newState = reducer(initial, addressYearsAction);
    expect(newState.years).toEqual(addressYearsAction.payload.newValue);
  });

  test("update address duration months", () => {
    const addressMonthsAction: UpdateMonthsAction = {
      type: actionTypes.updateMonths,
      payload: { newValue: 8 },
    };
    const newState = reducer(initial, addressMonthsAction);
    expect(newState.months).toEqual(addressMonthsAction.payload.newValue);
  });

  test("update postcode", () => {
    const addressPostcodeAction: UpdatePostcodeAction = {
      type: actionTypes.updatePostcode,
      payload: { newValue: "E16 1PG" },
    };
    const newState = reducer(initial, addressPostcodeAction);
    expect(newState.postcode).toEqual(addressPostcodeAction.payload.newValue);
  });

  test("update addresses", () => {
    const addressesAction: SetAddressesAction = {
      type: actionTypes.setAddresses,
      payload: {
        addresses: [
          [
            "1 test street",
            "test lane",
            "test area",
            "test city",
            "test county",
          ],
        ],
      },
    };
    const newState = reducer(initial, addressesAction);
    expect(newState.addresses).toEqual(addressesAction.payload.addresses);
  });
});
