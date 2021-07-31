import {
  reducer,
  actionTypes,
  UpdatePostcodeAction,
  UpdateMonthsAction,
  UpdateYearsAction,
} from "./reducer";

describe("unit test reducer updates address durations", () => {
  const initial = {
    years: null,
    months: null,
    postcode: null,
  };
  test("update address duration years", () => {
    const addressYearsAction: UpdateYearsAction = {
      type: actionTypes.updateYears,
      payload: { newValue: 1 },
    };
    const newState = reducer(initial, addressYearsAction);
    expect(newState.years).toEqual(1);
  });

  test("update address duration months", () => {
    const addressMonthsAction: UpdateMonthsAction = {
      type: actionTypes.updateMonths,
      payload: { newValue: 8 },
    };
    const newState = reducer(initial, addressMonthsAction);
    expect(newState.months).toEqual(8);
  });

  test("update postcode", () => {
    const addressPostcodeAction: UpdatePostcodeAction = {
      type: actionTypes.updatePostcode,
      payload: { newValue: "E16 1PG" },
    };
    const newState = reducer(initial, addressPostcodeAction);
    expect(newState.postcode).toEqual("E16 1PG");
  });
});
