import apiConfig from "@/api/apiConfig"
import HttpAuthenticationError from "@/api/errors/HttpAuthenticationError"
import webConfig from "@/web/webConfig"
import jsonwebtoken, {
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken"

const auth =
  (isRequired = true) =>
  (ctx) => {
    const {
      input: {
        body: { token: localStorageJwt },
      },
      req: {
        cookies: { [webConfig.security.session.cookie.key]: cookieJwt },
      },
      next,
    } = ctx

    if (!localStorageJwt && !cookieJwt && isRequired) {
      throw new HttpAuthenticationError("Missing credentials.")
    }

    try {
      const {
        payload: { user },
      } = jsonwebtoken.verify(localStorageJwt, apiConfig.security.jwt.secret)
      const { token: extractedCookieToken } = jsonwebtoken.verify(
        cookieJwt,
        apiConfig.security.jwt.secret,
      )

      if (
        localStorageJwt !==
        extractedCookieToken[webConfig.security.session.cookie.key]
      ) {
        throw new HttpAuthenticationError("Invalid credentials.")
      }

      ctx.user = user
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new HttpAuthenticationError("Expired credentials.")
      }

      if (err instanceof JsonWebTokenError) {
        throw new HttpAuthenticationError("Invalid credentials.")
      }

      throw err
    }

    next()
  }

export default auth
