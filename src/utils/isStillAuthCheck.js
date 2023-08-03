import { auth } from "../../config"; //firebase


const isStillAuthCheck = (currentToken) => {

  const user = auth.currentUser;
  if (currentToken && user) {
    const validToken = user.stsTokenManager.accessToken;
    return Boolean(currentToken === validToken);
  }
  if (!user || currentToken === null) return false;
};

export default isStillAuthCheck;
