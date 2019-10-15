import React from "react";
import { mount } from "enzyme";
import App from "./App";
import { findByTestAttr } from "./test/utils";
import hookActions from "./hooks/hookActions";

const mockGetSecretWord = jest.fn();
const setup = (secretWord = "party") => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;
  const mockUseReducer = jest.fn().mockReturnValue([{ secretWord }, jest.fn]);
  React.useReducer = mockUseReducer;
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

describe("secretWordi is not null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup("party");
  });
  test("render app when secretWord is not null", () => {
    const component = findByTestAttr(wrapper, "component-app");
    expect(component.exists()).toBe(true);
  });
  test("not render spinner when secretWord is not null", () => {
    const spinner = findByTestAttr(wrapper, "spinner");
    expect(spinner.exists()).toBe(false);
  });
});
describe("secretWordi is  null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });
  test("not render app when secretWord is not null", () => {
    const component = findByTestAttr(wrapper, "component-app");
    expect(component.exists()).toBe(false);
  });
  test(" render spinner when secretWord is not null", () => {
    const spinner = findByTestAttr(wrapper, "spinner");
    expect(spinner.exists()).toBe(true);
  });
});
