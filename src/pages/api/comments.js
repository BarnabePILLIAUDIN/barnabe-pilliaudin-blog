import HttpForbiddenError from "@/api/errors/HttpForbidenError"
import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  commentValidator,
  idValidator,
  tokenValidator,
} from "@/utils/validator"

const handler = mw({
  POST: [
    validate({
      body: {
        content: commentValidator.required(),
        postId: idValidator.required(),
        token: tokenValidator.required(),
      },
    }),
    auth(),
    async ({
      send,
      user,
      input: {
        body: { content, postId },
      },
      models: { CommentModel },
    }) => {
      if (!user) {
        throw new HttpForbiddenError("You need to be logged to comment a post.")
      }

      const newComment = await CommentModel.query().insertAndFetch({
        content,
        userId: user.id,
        postId,
      })

      send(newComment, { count: 1 })
    },
  ],
})

export default handler