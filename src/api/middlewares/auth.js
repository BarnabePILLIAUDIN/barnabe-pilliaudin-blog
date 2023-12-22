import apiConfig from "@/api/apiConfig"
import HttpAuthenticationError from "@/api/errors/HttpAuthenticationError"
import HTTP_CODES from "@/api/httpCodes"
import genCookiesJwt from "@/api/utils/genCookiesJWT"
import genSetCookies from "@/api/utils/genSetCookies"
import UserModel from "@/db/models/UserModel"
import webConfig from "@/web/webConfig"
import jsonwebtoken, {
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken"

const auth =
  (isRequired = true) =>
  async (ctx) => {
    const {
      input: {
        body: { token: localStorageJwt },
      },
      req: {
        cookies: { [webConfig.security.session.cookie.key]: cookieJwt },
      },
      next,
      send,
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
        send(
          "EXPIRED SESSION PLEASE LOGIN AGAIN",
          { loginAgain: true },
          HTTP_CODES.UNAUTHORIZED,
        )

        return
      }

      if (err instanceof JsonWebTokenError) {
        throw new HttpAuthenticationError("Invalid credentials.")
      }

      throw err
    }

    await next()
  }

export default auth
