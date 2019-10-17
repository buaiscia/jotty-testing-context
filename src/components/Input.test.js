import React from "react";
import { mount } from "enzyme";
import Input from "./Input";
import { findByTestAttr, checkProps } from "../test/utils";
import languageContext from "../contexts/languageContext";
import successContext from "../contexts/successContext";
import guessedWordsContext from "../contexts/guessedWordsContext";

const setup = ({ secretWord = "party", language = "en", success = false }) => {
  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <guessedWordsContext.GuessedWordsProvider>
          <Input secretWord={secretWord} />
        </guessedWordsContext.GuessedWordsProvider>
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
};

it("Input renders without error", () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, "component-input");
  expect(component.length).toBe(1);
});

test("does not throw warning with expected props", () => {
  checkProps(Input, { secretWord: "party" });
});

describe("language is selected properly", () => {
  test("submit button has submite text in English", () => {
    const wrapper = setup({});
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("Submit");
  });
  test("submit button has submite text in emoji", () => {
    const wrapper = setup({ language: "emoji" });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("🚀");
  });
});

describe("state controlle input fiels", () => {
  let setCurrentGuessMock = jest.fn();
  let wrapper;
  beforeEach(() => {
    setCurrentGuessMock.mockClear();
    React.useState = jest.fn(() => ["", setCurrentGuessMock]);
    wrapper = setup({});
  });
  test("state updates with value of input box upon change", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");
    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);
    expect(setCurrentGuessMock).toHaveBeenCalledWith("train");
  });
  test("state updates with empty string after submit button is clicked", () => {
    const submitButton = findByTestAttr(wrapper, "submit-button");
    const mockEvent = { preventDefault: () => {} };
    submitButton.simulate("click", mockEvent);
    expect(setCurrentGuessMock).toHaveBeenCalledWith("");
  });
});

test("do not render if success is true", () => {
  const wrapper = setup({ secretWord: "party", success: true });
  expect(wrapper.isEmptyRender()).toBe(true);
});
