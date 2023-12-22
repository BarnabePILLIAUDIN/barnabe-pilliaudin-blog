import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { commentValidator, idValidator } from "@/utils/validator"

const handler = mw({
  GET: [
    validate({
      query: {
        commentId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { commentId },
      },
      models: { CommentModel },
    }) => {
      const comment = await CommentModel.query()
        .findById(commentId)
        .withGraphFetched("[user,post.user]")
        .throwIfNotFound()

      send(comment, { count: 1 })
    },
  ],
  PATCH: [
    validate({
      query: {
        commentId: idValidator.required(),
      },
      body: {
        content: commentValidator.required(),
      },
    }),
    auth(),
    async ({
      send,
      input: {
        query: { commentId },
        body: { content },
      },
      models: { CommentModel },
    }) => {
      const updatedComment = await CommentModel.query()
        .updateAndFetchById(commentId, {
          content,
        })
        .withGraphFetched("[user,post.user]")
        .throwIfNotFound()

      send(updatedComment, { count: 1 })
    },
  ],
  DELETE: [
    auth(),
    validate({
      query: {
        commentId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { commentId },
      },
      models: { CommentModel },
    }) => {
      try {
        const deletedComment = await CommentModel.query()
          .findById(commentId)
          .withGraphFetched("[user,post.user]")
          .throwIfNotFound()

        await CommentModel.query().deleteById(commentId)
        send(deletedComment, { count: 1 })
      } catch (error) {
        send({ error }, { count: 0 })
      }
    },
  ],
})

export default handler
