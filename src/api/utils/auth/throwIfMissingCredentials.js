import HttpAuthenticationError from "@/api/errors/HttpAuthenticationError"

const throwIfMissingCredentials = (localStorageJwt, cookieJwt, isRequired) => {
  if (!localStorageJwt && !cookieJwt && isRequired) {
    throw new HttpAuthenticationError("Missing credentials.")
  }
}

export default throwIfMissingCredentials
