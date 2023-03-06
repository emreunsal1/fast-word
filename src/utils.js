import words from "./words.json";

export const generateRandomWord = (minL = 3, length = 3) => {
  const result = words.filter((word) => {
    if (word.length < 20 && word.length > minL) {
      return word;
    }
  });
  return Array(length)
    .fill(null)
    .map(() => {
      const randomNumber = Math.floor(Math.random() * result.length);
      return result[randomNumber];
    });
};
