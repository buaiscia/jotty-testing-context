import React from "react";
import { mount } from "enzyme";
import App from "./App";
import { findByTestAttr } from "./test/utils";
import hookActions from "./hooks/hookActions";

const mockGetSecretWord = jest.fn();
const setup = () => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;
  // use mount because useEffect is not called with shallow
  // https://github.com/airbnb/enzyme/issues/2086
  return mount(<App />);
};

it("App renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-app");
  expect(component.length).toBe(1);
});

describe("getSecretWord called", () => {
  it("secretWord called on mount", () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();
  });
  it("secretWord not updated on app update", () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    wrapper.setProps();
    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});
