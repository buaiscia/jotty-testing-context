import React from "react";

const GuessWords = props => {
  let content;
  if (props.guessedWords.length === 0) {
    content = <span data-test="guess-instructions">Guess a word!</span>;
  } else {
    const guessedWordsMap = props.guessedWords.map((word, index) => (
      <tr key={index} data-test="guessed-word">
        <td>{word.guessedWord}</td>
        <td>{word.letterMatchCount}</td>
      </tr>
    ));
    content = (
      <div data-test="guessed-words">
        <h3>Guessed words</h3>
        <table>
          <thead>
            <tr>
              <th>Guess</th>
              <th>Matching letters</th>
            </tr>
          </thead>
          <tbody>{guessedWordsMap}</tbody>
        </table>
      </div>
    );
  }
  return <div data-test="component-guessed-words">{content}</div>;
};

export default GuessWords;
