import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Congrats from "./components/Congrats";
import GuessWords from "./components/GuessWords";

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <Congrats success={true} />
        <GuessWords
          guessedWords={[{ guessedWord: "train", letterMatchCount: 3 }]}
        />
      </div>
    );
  }
}

export default App;
