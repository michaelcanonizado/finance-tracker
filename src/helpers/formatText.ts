export const formatText = (text: string) => {
  text = text.trim();

  if (text.length === 0) {
    text = "-";
  }

  return text;
};
