import React from "react";
import languageContext from "../contexts/languageContext";
import { tr } from "../helpers/strings";

const GuessWords = props => {
  const language = React.useContext(languageContext);
  let content;
  if (props.guessedWords.length === 0) {
    content = (
      <span data-test="guess-instructions">{tr(language, "guessPrompt")}</span>
    );
  } else {
    const guessedWordsMap = props.guessedWords.map((word, index) => (
      <tr key={index} data-test="guessed-word">
        <td>{word.guessedWord}</td>
        <td>{word.letterMatchCount}</td>
      </tr>
    ));
    content = (
      <div data-test="guessed-words">
        <h3>{tr(language, "guessedWords")}</h3>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>{tr(language, "guessColumnHeader")}</th>
              <th>{tr(language, "matchingLettersColumnHeader")}</th>
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
