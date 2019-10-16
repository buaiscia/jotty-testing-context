import React from "react";
import languageContext from "../contexts/languageContext";
import { tr } from "../helpers/strings";

export default props => {
  const language = React.useContext(languageContext);
  if (props.success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">{tr(language, "congrats")}</span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};
