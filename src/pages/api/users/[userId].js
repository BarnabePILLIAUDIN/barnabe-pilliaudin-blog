import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
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
    async ({
      send,
      input: {
        query: { userId },
        body,
      },
      models: { UserModel },
    }) => {
      const hashedPassword = UserModel.hashPassword(body.password) ?? ""
      const updatedUser = await UserModel.query()
        .updateAndFetchById(userId, {
          ...body,
          hashedPassword,
        })
        .throwIfNotFound()
      send(updatedUser)
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
