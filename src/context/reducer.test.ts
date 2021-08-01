import {
  actionTypes,
  ContextType,
  reducer,
  UpdateModalAction,
} from "./reducer";

describe("unit test reducer updates address durations", () => {
  const initial: ContextType = {
    modal: {
      title: "",
      subheading: "",
      isVisible: false,
    },
  };
  test("update address duration years", () => {
    const updateModalAction: UpdateModalAction = {
      type: actionTypes.updateModal,
      payload: {
        isVisible: true,
        title: "New title",
        subheading: "New subheading",
      },
    };
    const newContext = reducer(initial, updateModalAction);
    expect(newContext.modal).toEqual(updateModalAction.payload);
  });
});
