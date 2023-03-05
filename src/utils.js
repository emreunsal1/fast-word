import words from "./words.json";

export const generateRandomWord = (maxL = 20, minL = 3, length = 3) => {
  const result = words.filter((word) => {
    if (word.length < maxL && word.length > minL) {
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
