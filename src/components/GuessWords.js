import React from "react";

const GuessWords = props => {
  let content;
  if (props.guessedWords.length === 0) {
    content = <span data-test="guess-instructions">Guess a word!</span>;
  }
  return <div data-test="component-guessed-words">{content}</div>;
};

export default GuessWords;
