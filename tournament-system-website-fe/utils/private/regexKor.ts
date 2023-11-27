export const regexKor = (msg: string) => {
  const regex = /^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a30-9- ]+$/;
  return regex.test(msg);
};
