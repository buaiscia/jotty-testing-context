import React from "react";
import { shallow } from "enzyme";
import GuessWords from "./GuessWords";
import { findByTestAttr } from "../test/utils";

const setup = (props = {}) => {
  return shallow(<GuessWords {...props} />);
};

describe("if there are no words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });

  test("renders without errors", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(1);
  });
  test("renders istrunctions to guess a word", () => {
    const component = findByTestAttr(wrapper, "guess-instructions");
    expect(component.text().length).not.toBe(0);
  });
});
