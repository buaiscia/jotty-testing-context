import React from "react";
import { shallow } from "enzyme";
import GuessWords from "./GuessWords";
import { findByTestAttr } from "../test/utils";
import guessedWordsContext from "../contexts/guessedWordsContext";

const setup = guesseWords => {
  const mockUseGuessedWords = jest
    .fn()
    .mockReturnValue([guesseWords, jest.fn()]);
  guessedWordsContext.useGuessedWords = mockUseGuessedWords;
  return shallow(<GuessWords />);
};

describe("if there are no words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup([]);
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
    wrapper = setup(guessedWords);
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

describe("language is set correctly", () => {
  test("guess instructions are in english by default", () => {
    const wrapper = setup([]);
    const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
    expect(guessInstructions.text()).toBe("Try to guess the secret word!");
  });
  test("guess instructions are in emoji when emoji is selected", () => {
    const mockUseContext = jest.fn().mockReturnValue("emoji");
    React.useContext = mockUseContext;
    const wrapper = setup([]);
    const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
    expect(guessInstructions.text()).toBe("🤔🤫🔤");
  });
});
