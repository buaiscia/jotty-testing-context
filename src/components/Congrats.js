import React from "react";

export default props => {
  if (props.success) {
    return (
      <div data-test="component-congrats">
        <span data-test="congrats-message">
          Congratulations! You have found the word!
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};
