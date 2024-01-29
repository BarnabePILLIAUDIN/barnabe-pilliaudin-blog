import HTTP_CODES from "@/api/httpCodes"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import sanitizeUsers from "@/api/utils/sanitizeUsers"

import {
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  pageValidator,
  passwordValidator,
} from "@/utils/validators"
import auth from "@/api/middlewares/auth"

const handler = mw({
  GET: [
    validate({
      query: {
        page: pageValidator.required(),
      },
    }),
    auth(true, { isAdmin: true, isAuthor: false }),
    async ({
      models: { UserModel },
      send,
      input: {
        query: { page },
      },
    }) => {
      const query = UserModel.query()
      // Event though the order by id doesn't seem necessary I need so the users order doesn't change when updated on admin dashboard
      const users = await query.clone().orderBy("id").page(page)
      const [{ count }] = await query.clone().count()
      send(sanitizeUsers(users), { count })
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
    async ({ res, input, models: { UserModel }, send }) => {
      const existingUser = await UserModel.query()
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
        await UserModel.query().insert({
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
    },
  ],
})

export default handler
