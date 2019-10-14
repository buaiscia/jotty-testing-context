import React from "react";
import { shallow } from "enzyme";
import Input from "./Input";
import { findByTestAttr, checkProps } from "../test/utils";

const setup = (secretWord = "party") => {
  return shallow(<Input secretWord={secretWord} />);
};

it("Input renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-input");
  expect(component.length).toBe(1);
});

test("does not throw warning with expected props", () => {
  checkProps(Input, { secretWord: "party" });
});

describe("state controlle input fiels", () => {
  test("state updates with value of input box upon change", () => {
    const setCurrentGuessMock = jest.fn();
    React.useState = jest.fn(() => ["", setCurrentGuessMock]);
    const wrapper = setup();
    const inputBox = findByTestAttr(wrapper, "input-box");
    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);
    expect(setCurrentGuessMock).toHaveBeenCalledWith("train");
  });
});
