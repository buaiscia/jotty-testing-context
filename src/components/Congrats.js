import React from "react";
import languageContext from "../contexts/languageContext";
import { tr } from "../helpers/strings";
import successContext from "../contexts/successContext";

export default () => {
  const language = React.useContext(languageContext);
  const [success] = successContext.useSuccess();
  if (success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">{tr(language, "congrats")}</span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};
