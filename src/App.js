import React, { Component } from "react";
import "./App.css";
import Congrats from "./components/Congrats";
import GuessWords from "./components/GuessWords";
import hookActions from "./hooks/hookActions";

const reducer = (state, action) => {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
};
function App() {
  const [state, dispatch] = React.useReducer(reducer, { secretWord: null });

  const setSecretWord = secretWord =>
    dispatch({ type: "setSecretWord", payload: secretWord });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);
  return <div data-test="component-app"></div>;
}

export default App;
