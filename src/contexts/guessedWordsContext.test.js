import React from "react";
import { shallow, mount } from "enzyme";
import gwContext from "./guessedWordsContext";
import guessedWordsContext from "./guessedWordsContext";

function TestComponent() {
  gwContext.useGuessedWords();
  return <div />;
}

test("throw error if useGuessedWords is not called in GuessedWordsProvider context", () => {
  expect(() => shallow(<TestComponent />)).toThrow(
    "useGuessedWords is not called within GuessedWordsProvider"
  );
});
test("does not throw error if useGuessedWords is called in GuessedWordsProvider context", () => {
  expect(() =>
    mount(
      <guessedWordsContext.GuessedWordsProvider>
        <TestComponent />
      </guessedWordsContext.GuessedWordsProvider>
    )
  ).not.toThrow();
});
