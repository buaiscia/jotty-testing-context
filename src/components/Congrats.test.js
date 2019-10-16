import React from "react";
import { mount } from "enzyme";
import Congrats from "./Congrats";
import { findByTestAttr } from "../test/utils";
import languageContext from "../contexts/languageContext";

/**
 * Factory to create e Shallow Wrapper for the Congrats component
 * @param {Object} props
 * @returns {ShallowWrapper}
 */
const setup = ({ success = false, language = "en" }) => {
  return mount(
    <languageContext.Provider value={language}>
      <Congrats success={success} />
    </languageContext.Provider>
  );
};

describe("languagePicker in action", () => {
  test("should render the congrats string in English", () => {
    const wrapper = setup({ success: true });
    expect(wrapper.text()).toBe("Congratulations! You guessed the word!");
  });
  test("should render the congrats string in emoji", () => {
    const wrapper = setup({ success: true, language: "emoji" });
    expect(wrapper.text()).toBe("🎯🎉");
  });
});

test("renders without error", () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.length).toBe(1);
});
test("renders no text when success prop is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.text()).toBe("");
});
test("renders no empty text when 'success' prop is true", () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, "congrats-message");
  expect(message.text().length).not.toBe(0);
});
