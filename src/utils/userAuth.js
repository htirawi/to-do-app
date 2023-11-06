const userAuth = () => {
  const setCookie = (cookieName, cookieVal, cookieExpiryTime) => {
    const d = new Date();
    d.setTime(d.getTime() + cookieExpiryTime * 3600 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieVal + ";" + expires + ";path=/";
  };

  const getCookie = (name) => {
    return document.cookie.match(RegExp("(?:^|;\\s*)" + name + "=([^;]*)"))
      ? true
      : null;
  };

  const getCookieByName = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const deleteCookie = (name) => {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return { setCookie, getCookie, deleteCookie, getCookieByName };
};

export default userAuth;
