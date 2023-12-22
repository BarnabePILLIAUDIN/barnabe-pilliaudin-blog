import apiConfig from "@/api/apiConfig"
import HttpAuthenticationError from "@/api/errors/HttpAuthenticationError"
import HTTP_CODES from "@/api/httpCodes"
import throwIfMissingCredentials from "@/api/utils/auth/throwIfMissingCredentials"
import throwIfTokensDoesntMatch from "@/api/utils/auth/throwIfTokensDoesntMatch"
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

    throwIfMissingCredentials(localStorageJwt, cookieJwt, isRequired)

    try {
      const {
        payload: { user },
      } = jsonwebtoken.verify(localStorageJwt, apiConfig.security.jwt.secret)
      const { token: extractedCookieToken } = jsonwebtoken.verify(
        cookieJwt,
        apiConfig.security.jwt.secret,
      )

      throwIfTokensDoesntMatch(localStorageJwt, extractedCookieToken)

      const dbUser = await UserModel.query().findById(user.id)

      if (!dbUser) {
        throw new HttpAuthenticationError("Invalid credentials.")
      }

      if (!dbUser.isActive) {
        throw new HttpAuthenticationError("You have been banned from the blog")
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
