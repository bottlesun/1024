export const regexEng = (msg: string) => {
  const regex = /^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9- ]+$/;
  return regex.test(msg);
};
