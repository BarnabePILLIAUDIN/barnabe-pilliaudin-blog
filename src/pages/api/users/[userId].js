import HttpForbiddenError from "@/api/errors/HttpForbiddenError"
import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import sanitizeBody from "@/api/utils/auth/sanitizeBody"
import genSetCookies from "@/api/utils/genSetCookies"
import sanitizeUser from "@/api/utils/sanitizeUser"
import {
  firstNameValidator,
  idValidator,
  lastNameValidator,
  tokenValidator,
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

      const sanitizedBody = sanitizeBody(body)
      const updatedUser = await UserModel.query()
        .updateAndFetchById(userId, {
          ...sanitizedBody,
        })
        .throwIfNotFound()
      const token = UserModel.generateJWT(updatedUser)
      res.setHeader("set-cookie", genSetCookies(token))

      send({ updatedUser: sanitizeUser(updatedUser), token })
    },
  ],
  DELETE: [
    validate({
      body: {
        token: tokenValidator.required(),
      },
      query: {
        userId: idValidator.required(),
      },
    }),
    auth(true, { isAuthor: false, isAdmin: true }),
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
      send(sanitizeUser(deletedUser))
    },
  ],
})

export default handler
