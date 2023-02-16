export const getToken = () => {
  let authData = localStorage.getItem("ims-auth");
  if (authData) {
    authData = JSON.parse(authData);
    return authData.token;
  }
  return undefined;
};

export const getUser = () => {
  let authData = localStorage.getItem("ims-auth");
  if (authData) {
    authData = JSON.parse(authData);
    return authData.user;
  }
  return undefined;
};

export const checkAthenticatedUser = () => {
  let authData = localStorage.getItem("ims-auth");
  if (authData) {
    return true;
  }
  return false;
};

export const saveStorage = (user, token, sudoName) => {
  let authData = JSON.stringify({ user, token, sudoName });
  localStorage.setItem("ims-auth", authData);
};

export const removeStorage = () => {
  localStorage.removeItem("ims-auth");
};

export const refreshStorage = (user) => {
  let authData = localStorage.getItem("ims-auth");
  if (authData) {
    authData = JSON.parse(authData);
    authData.user = user;
    localStorage.setItem("ims-auth", JSON.stringify(authData));
  }
};
