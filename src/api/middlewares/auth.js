import apiConfig from "@/api/apiConfig"
import HttpAuthenticationError from "@/api/errors/HttpAuthenticationError"
import HTTP_CODES from "@/api/httpCodes"
import throwIfMissingCredentials from "@/api/utils/auth/throwIfMissingCredentials"
import throwIfNotAuthorized from "@/api/utils/auth/throwIfNotAuthorized"
import throwIfTokensDoesntMatch from "@/api/utils/auth/throwIfTokensDoesntMatch"
import sanitizeUser from "@/api/utils/sanitizeUser"
import UserModel from "@/db/models/UserModel"
import webConfig from "@/web/webConfig"
import jsonwebtoken, {
  JsonWebTokenError,
  TokenExpiredError,
} from "jsonwebtoken"

const auth =
  (
    isRequired = true,
    requiredAuthorisation = { isAdmin: false, isAuthor: false },
  ) =>
  async (ctx) => {
    const {
      req: {
        cookies: { [webConfig.security.session.cookie.key]: cookieJwt },
        headers: { authorization },
      },
      next,
      send,
    } = ctx

    throwIfMissingCredentials(authorization, cookieJwt, isRequired)

    try {
      const {
        payload: { user },
      } = jsonwebtoken.verify(authorization, apiConfig.security.jwt.secret)
      const { token: extractedCookieToken } = jsonwebtoken.verify(
        cookieJwt,
        apiConfig.security.jwt.secret,
      )

      throwIfTokensDoesntMatch(authorization, extractedCookieToken)

      const dbUser = await UserModel.query().findById(user.id)
      throwIfNotAuthorized(requiredAuthorisation, dbUser)
      ctx.user = sanitizeUser(dbUser)
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
