import React from "react";
import { mount } from "enzyme";
import successContext from "./contexts/successContext";
import gwContext from "./contexts/guessedWordsContext";

import Input from "./components/Input";
import GuessedWords from "./components/GuessWords";
import { findByTestAttr } from "./test/utils";

function setup(guessedWordStrings = [], secretWord = "party") {
  const wrapper = mount(
    <gwContext.GuessedWordsProvider>
      <successContext.SuccessProvider>
        <Input secretWord={secretWord} />
        <GuessedWords />
      </successContext.SuccessProvider>
    </gwContext.GuessedWordsProvider>
  );

  const inputBox = findByTestAttr(wrapper, "input-box");
  const submitButton = findByTestAttr(wrapper, "submit-button");
  // pre-populate guessed words
  guessedWordStrings.map(word => {
    const mockEvent = { target: { value: word } };
    inputBox.simulate("change", mockEvent);
    submitButton.simulate("click");
  });
  return [wrapper, inputBox, submitButton];
}

describe("test word guesses", () => {
  let inputBox;
  let wrapper;
  let submitButton;
  describe("no-empty guessed words", () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup(["agile"], "party");
    });

    describe("correct guess", () => {
      beforeEach(() => {
        const mockEvent = { target: { value: "party" } };
        inputBox.simulate("change", mockEvent);
        submitButton.simulate("click");
      });
      test("Input component containes no children", () => {
        const inputComponent = findByTestAttr(wrapper, "component-input");
        expect(inputComponent.children().length).toBe(0);
      });
      test("add guess correctly to GuessedComponent table", () => {
        const rows = findByTestAttr(wrapper, "guessed-word");
        expect(rows.length).toBe(2);
      });
    });
    describe("incorrect guess", () => {
      beforeEach(() => {
        const mockEvent = { target: { value: "train" } };
        inputBox.simulate("change", mockEvent);
        submitButton.simulate("click");
      });
      test("Input component remains", () => {
        expect(inputBox.exists()).toBe(true);
      });
      test("add guess correctly to GuessedComponent table", () => {
        const rows = findByTestAttr(wrapper, "guessed-word");
        expect(rows.length).toBe(2);
      });
    });
  });
  describe("empty guessed words", () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup([], "party");
    });
    test("add guess to empty GuessedComponent table", () => {
      const mockEvent = { target: { value: "party" } };
      inputBox.simulate("change", mockEvent);
      submitButton.simulate("click");
      const rows = findByTestAttr(wrapper, "guessed-word");
      expect(rows.length).toBe(1);
    });
  });
});
