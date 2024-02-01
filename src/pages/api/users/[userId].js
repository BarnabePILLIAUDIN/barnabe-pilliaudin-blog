import HttpForbiddenError from "@/api/errors/HttpForbiddenError"
import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import sanitizeBody from "@/api/utils/auth/sanitizeBody"
import genCookiesJwt from "@/api/utils/genCookiesJWT"
import genSetCookies from "@/api/utils/genSetCookies"
import sanitizeUser from "@/api/utils/sanitizeUser"
import {
  firstNameValidator,
  idValidator,
  lastNameValidator,
} from "@/utils/validators"

const handler = mw({
  PATCH: [
    async ({ next }) => {
      await next()
    },
    validate({
      query: {
        userId: idValidator.required(),
      },
      body: {
        firstName: firstNameValidator,
        lastName: lastNameValidator,
      },
    }),
    async ({ next }) => {
      await next()
    },
    auth(),
    async ({ next }) => {
      await next()
    },
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
      if (user.id !== userId && !user.isAdmin) {
        throw new HttpForbiddenError("You are not allowed to do that.")
      }

      // The requests from admin dashboard will send the updated user inside the user key of the body
      // But the request from myAccount will send the updated user spread in the body
      // That's why we have to do this treatment
      const sanitizedBody = body.user
        ? sanitizeBody(body.user)
        : sanitizeBody(body)
      const updatedUser = await UserModel.query()
        .updateAndFetchById(userId, {
          ...sanitizedBody,
        })
        .throwIfNotFound()
      const isUserUpdatingHimself = user.id === userId

      // If it's an update from myAccount we need to generate new cookies and new token that matches updated user
      if (isUserUpdatingHimself) {
        const localStorageJwt = UserModel.generateJWT(user)
        const cookieJwt = genCookiesJwt(localStorageJwt)

        res.setHeader("set-cookie", genSetCookies(cookieJwt))
        send({ updatedUser: sanitizeUser(updatedUser), token: localStorageJwt })

        return
      }

      // If it's an admin that update the user the last thing we want is to give him a cookie and a token of the user he updates
      send({ updatedUser: sanitizeUser(updatedUser) })
    },
  ],
  DELETE: [
    validate({
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
  GET: [
    validate({
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
      const user = await UserModel.query().findById(userId).throwIfNotFound()
      send(sanitizeUser(user))
    },
  ],
})

export default handler
