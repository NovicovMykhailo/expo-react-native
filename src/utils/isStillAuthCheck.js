import { getAuth } from "firebase/auth";

const isStillAuthCheck = currentToken => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (currentToken && user) {
    const validToken = user.stsTokenManager.accessToken;
    return Boolean(currentToken === validToken);
  }
  if (!user || currentToken === null) return false;
};

export default isStillAuthCheck;
