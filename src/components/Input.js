import React from "react";
import PropTypes from "prop-types";
import languageContext from "../contexts/languageContext";
import { tr } from "../helpers/strings";

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState("");
  const language = React.useContext(languageContext);

  const handleSubmit = evt => {
    evt.preventDefault();
    // TODO
    // update guessedWords
    // check upon secrtWord
    setCurrentGuess("");
  };
  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder={tr(language, "guessInputPlaceholder")}
          value={currentGuess}
          onChange={evt => setCurrentGuess(evt.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={handleSubmit}
        >
          {tr(language, "submit")}
        </button>
      </form>
    </div>
  );
};
Input.propTypes = {
  secretWord: PropTypes.string.isRequired
};
export default Input;
