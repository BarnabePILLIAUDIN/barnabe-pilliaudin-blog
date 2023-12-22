import HttpAuthenticationError from "@/api/errors/HttpAuthenticationError"
import webConfig from "@/web/webConfig"

const throwIfTokensDoesntMatch = (localStorageJwt, extractedCookieToken) => {
  if (
    localStorageJwt !==
    extractedCookieToken[webConfig.security.session.cookie.key]
  ) {
    throw new HttpAuthenticationError("Invalid credentials.")
  }
}

export default throwIfTokensDoesntMatch
