import HttpForbiddenError from "@/api/errors/HttpForbiddenError"
import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import genSetCookies from "@/api/utils/genSetCookies"
import {
  firstNameValidator,
  idValidator,
  lastNameValidator,
} from "@/utils/validator"

const handler = mw({
  PATCH: [
    validate({
      query: {
        userId: idValidator.required(),
      },
      body: {
        firstName: firstNameValidator,
        lastName: lastNameValidator,
      },
    }),
    auth(),
    async ({
      send,
      res,
      input: {
        query: { userId },
        body,
      },
      user,
      models: { UserModel },
    }) => {
      if (user.id !== userId) {
        throw new HttpForbiddenError("You are not allowed to do that.")
      }

      const { token: _token, ...sanitizedBody } = body
      const updatedUser = await UserModel.query()
        .updateAndFetchById(userId, {
          ...sanitizedBody,
        })
        .throwIfNotFound()
      const token = UserModel.generateJWT(updatedUser)
      res.setHeader("set-cookie", genSetCookies(token))

      send({ updatedUser, token })
    },
  ],
  DELETE: [
    validate({
      query: {
        userId: idValidator.required(),
      },
    }),
    async ({
      models: { UserModel },
      send,
      input: {
        query: { userId },
      },
    }) => {
      const deletedUser = await UserModel.query()
        .deleteById(userId)
        .throwIfNotFound()
      send(deletedUser)
    },
  ],
})

export default handler
