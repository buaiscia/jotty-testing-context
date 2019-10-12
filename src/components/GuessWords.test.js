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

describe("if there are words guessed", () => {
  let wrapper;
  const guessedWords = [
    { guessedWord: "train", letterMatchCount: 3 },
    { guessedWord: "agile", letterMatchCount: 1 },
    { guessedWord: "party", letterMatchCount: 3 }
  ];
  beforeEach(() => {
    wrapper = setup({ guessedWords });
  });
  test("renders without error", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(1);
  });
  test("renders guess words section", () => {
    const node = findByTestAttr(wrapper, "guessed-words");
    expect(node.length).toBe(1);
  });
  test("displays correct number of guess words", () => {
    const nodes = findByTestAttr(wrapper, "guessed-word");
    expect(nodes.length).toBe(guessedWords.length);
  });
});
