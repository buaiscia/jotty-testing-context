import React from "react";
import PropTypes from "prop-types";

const languages = [
  { code: "en", symbol: "🇺🇸" },
  { code: "it", symbol: "IT" },
  { code: "emoji", symbol: "😊" }
];

const LanguagePicker = ({ setLanguage }) => {
  const languageIcons = languages.map(lang => (
    <span
      data-test="language-icon"
      key={lang.code}
      onClick={() => setLanguage(lang.code)}
    >
      {lang.symbol}
    </span>
  ));
  return <div data-test="component-language-picker">{languageIcons}</div>;
};

LanguagePicker.propTypes = {
  setLanguage: PropTypes.func.isRequired
};
export default LanguagePicker;
