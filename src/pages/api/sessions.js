import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import { emailValidator, passwordValidator } from "@/utils/validator"
import HttpAuthenticationError from "@/api/errors/HttpAuthenticationError"
import apiConfig from "@/api/apiConfig"
import genCookies from "@/api/utils/genCookies"
import jsonwebtoken from "jsonwebtoken"
import webConfig from "@/web/webConfig"
import ms from "ms"

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
      db,
      input: {
        body: { email, password: inputPassword },
      },
      res,
      send,
    }) => {
      const [user] = await UserModel.query(db).where({ email })

      if (!user) {
        throw new HttpAuthenticationError("Invalid credentials.")
      }

      const { hashedPassword: inputHashedPassword } =
        await UserModel.hashPassword(inputPassword, user.salt)

      if (inputHashedPassword !== user.hashedPassword) {
        throw new HttpAuthenticationError("Invalid credentials.")
      }

      const localStorageJwt = UserModel.generateJWT(user)
      const cookieJwt = jsonwebtoken.sign(
        {
          token: { localStorageJwt },
        },
        apiConfig.security.jwt.secret,
        {
          expiresIn: apiConfig.security.jwt.expiresIn,
        },
        {},
      )

      res.setHeader(
        "set-cookie",
        genCookies({
          name: webConfig.security.session.cookie.key,
          value: cookieJwt,
          expires: Date.now() + ms(apiConfig.security.jwt.expiresIn),
          path: "/",
          sameSite: "strict",
          httpOnly: true,
          secure: webConfig.security.session.cookie.secure,
        }),
      )

      //eslint-disable-next-line no-console
      console.log("cookieJwt", cookieJwt)
      //eslint-disable-next-line no-console
      console.log("localStorageJwt", localStorageJwt)

      send(localStorageJwt)
    },
  ],
})

export default handler
