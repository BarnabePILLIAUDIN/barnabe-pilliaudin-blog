import apiConfig from "@/api/apiConfig"
import HttpAuthenticationError from "@/api/errors/HttpAuthenticationError"
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
    } = ctx

    // If (!localStorageJwt && !cookieJwt && isRequired) {
    //   throw new HttpAuthenticationError("Missing credentials.")
    // }

    try {
      const {
        payload: { user },
      } = jsonwebtoken.verify(localStorageJwt, apiConfig.security.jwt.secret)
      // Const { token: extractedCookieToken } = jsonwebtoken.verify(
      //   cookieJwt,
      //   apiConfig.security.jwt.secret,
      // )

      // If (
      //   localStorageJwt !==
      //   extractedCookieToken[webConfig.security.session.cookie.key]
      // ) {
      //   throw new HttpAuthenticationError("Invalid credentials.")
      // }

      ctx.user = user
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        // If the token is expired, we'll generate a new one
        const {
          payload: { user },
        } = jsonwebtoken.decode(localStorageJwt)
        const newLocalStorageJwt = UserModel.generateJWT(user)
        const newCookieJwt = genCookiesJwt(newLocalStorageJwt)

        ctx.res.setHeader("set-cookie", genSetCookies(newCookieJwt))
        ctx.token = localStorageJwt
        ctx.user = user
        next()

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
