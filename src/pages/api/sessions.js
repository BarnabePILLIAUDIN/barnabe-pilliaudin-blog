import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import { emailValidator, passwordValidator } from "@/utils/validator"
import HttpAuthenticationError from "@/api/errors/HttpAuthenticationError"

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

      send("C'est bon!")
    },
  ],
})

export default handler
