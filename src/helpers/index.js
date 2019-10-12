/**
 * @method getLetterMatchCount
 * @param {string} guessedWord
 * @param {string} secretWord
 * @return {number} number of matched letters
 */
export function getLetterMatchCount(guessedWord, secretWord) {
  const guessedLettersSet = new Set(guessedWord.split(""));
  return secretWord.split("").filter(letter => guessedLettersSet.has(letter))
    .length;
}
