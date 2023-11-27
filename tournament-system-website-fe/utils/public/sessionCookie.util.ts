const SESSION_ID = "connect.sid";
const setSessionCookie = (cookies: any) => {
  try {
    return `${SESSION_ID}=${encodeURIComponent(cookies[SESSION_ID])}`;
  } catch (exception) {
    return null;
  }
};
export default setSessionCookie;
