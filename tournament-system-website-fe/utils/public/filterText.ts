export const filterText = (text: string | undefined) => {
  if (!text) return undefined;

  text = text.replace("all", "");
  return text;
};
