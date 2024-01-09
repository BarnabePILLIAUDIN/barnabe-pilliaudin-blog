import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import { emailValidator, passwordValidator } from "@/utils/validators"
import HttpAuthenticationError from "@/api/errors/HttpAuthenticationError"
import genCookiesJwt from "@/api/utils/genCookiesJWT"
import genSetCookies from "@/api/utils/genSetCookies"
import webConfig from "@/web/webConfig"
import ms from "ms"
import genCookies from "@/api/utils/genCookies"
import HttpForbiddenError from "@/api/errors/HttpForbiddenError"

const handler = mw({
  POST: [
    validate({
      body: {
        email: emailValidator.required(),
        password: passwordValidator.required(),
      },
    }),
    async ({
      models: { UserModel },
      input: {
        body: { email, password: inputPassword },
      },
      res,
      send,
    }) => {
      const [user] = await UserModel.query().where({ email })

      if (!user) {
        throw new HttpAuthenticationError("Invalid credentials.")
      }

      if (!user.isActive) {
        throw new HttpForbiddenError("You have been banned from the blog")
      }

      const { hashedPassword: inputHashedPassword } =
        await UserModel.hashPassword(inputPassword, user.salt)

      if (inputHashedPassword !== user.hashedPassword) {
        throw new HttpAuthenticationError("Invalid credentials.")
      }

      const localStorageJwt = UserModel.generateJWT(user)
      const cookieJwt = genCookiesJwt(localStorageJwt)

      res.setHeader("set-cookie", genSetCookies(cookieJwt))

      send(localStorageJwt)
    },
  ],
  DELETE: [
    ({ send, res }) => {
      res.setHeader(
        "set-cookie",
        genCookies({
          name: webConfig.security.session.cookie.key,
          value: "null",
          expires: Date.now() - ms("10 years"),
          path: "/",
          sameSite: "strict",
          httpOnly: true,
          secure: webConfig.security.session.cookie.secure,
        }),
      )
      send(true)
    },
  ],
})

export default handler
