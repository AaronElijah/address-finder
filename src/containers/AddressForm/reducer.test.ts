import {
  reducer,
  actionTypes,
  UpdatePostcodeAction,
  UpdateMonthsAction,
  UpdateYearsAction,
  SetAddressesAction,
  SetChosenAddressAction,
  SaveAddressAction,
  DeleteAddressAction,
  UpdateChosenAddressAction,
} from "./reducer";

describe("unit test reducer updates address durations", () => {
  const initial = {
    years: null,
    months: null,
    postcode: null,
    addresses: [],
    chosenAddress: null,
    savedAddress: null,
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

  test("set chosen address", () => {
    const chosenAddressesAction: SetChosenAddressAction = {
      type: actionTypes.setChosenAddress,
      payload: {
        addressOption:
          "1 test street,test lane,test area,test city,test county",
      },
    };
    const newState = reducer(initial, chosenAddressesAction);
    expect(newState.chosenAddress).toEqual({
      city: "test city",
      county: "test county",
      line1: "1 test street",
      line2: "test lane",
      line3: "test area",
    });
  });

  test("update chosen address", () => {
    const updateChosenAddressAction: UpdateChosenAddressAction = {
      type: actionTypes.updateChosenAddress,
      payload: {
        line1: "1 test street",
        line2: "test lane",
        city: "Manchester",
        postcode: "mm11mm",
      },
    };
    const newState = reducer(initial, updateChosenAddressAction);
    expect(newState.chosenAddress).toEqual({
      line1: "1 test street",
      line2: "test lane",
      city: "Manchester",
    });
  });

  test("save chosen address", () => {
    const saveAddressAction: SaveAddressAction = {
      type: actionTypes.saveAddress,
    };

    const testState = {
      ...initial,
      years: 2,
      months: 3,
      postcode: "a12f43",
      chosenAddress: {
        line1: "1 test street",
        line2: "test lane",
        line3: "test area",
        city: "test city",
        county: "test county",
      },
    };

    const newState = reducer(testState, saveAddressAction);
    expect(newState.savedAddress).toEqual({
      ...testState.chosenAddress,
      postcode: testState.postcode,
      years: testState.years,
      months: testState.months,
    });
  });

  test("delete saved address", () => {
    const deleteAddressAction: DeleteAddressAction = {
      type: actionTypes.deleteAddress,
    };

    const testState = {
      ...initial,
      savedAddress: {
        line1: "1 test street",
        line2: "test lane",
        line3: "test area",
        city: "test city",
        county: "test county",
        postcode: "a123f4",
        years: 3,
        months: 5,
      },
    };
    const newState = reducer(testState, deleteAddressAction);
    expect(newState.savedAddress).toBeNull();
  });
});
