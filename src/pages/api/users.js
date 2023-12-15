import HTTP_CODES from "@/api/httpCodes"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"

import {
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  passwordValidator,
} from "@/utils/validator"

const handler = mw({
  GET: [
    async ({ models: { UserModel }, send }) => {
      const users = await UserModel.query()
      const sanitizedUsers = users.map(
        ({ hashedPassword: _password, salt: _salt, ...sanitizedUser }) =>
          sanitizedUser,
      )

      send(sanitizedUsers, { count: sanitizedUsers.length })
    },
  ],
  POST: [
    validate({
      body: {
        firstName: firstNameValidator.required(),
        lastName: lastNameValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
      },
    }),
    async ({ res, db, input, models: { UserModel }, send }) => {
      const existingUser = await UserModel.query(db)
        .where({ email: input.body.email })
        .first()

      if (existingUser) {
        send(true)

        return
      }

      const { hashedPassword, salt } = await UserModel.hashPassword(
        input.body.password,
      )

      try {
        await UserModel.query(db).insert({
          firstName: input.body.firstName,
          lastName: input.body.lastName,
          email: input.body.email,
          hashedPassword,
          salt,
        })
        send(true)
      } catch (err) {
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
          error: "Something went wrong.",
        })
      }

      res.send("Hello world!")
    },
  ],
})

export default handler
