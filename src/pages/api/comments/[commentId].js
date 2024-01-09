import HTTP_CODES from "@/api/httpCodes"
import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import sanitizeComment from "@/api/utils/sanitizeComment"
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
        .withGraphFetched("[user,post.[user]]")
        .throwIfNotFound()

      send(sanitizeComment(comment), { count: 1 })
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
    auth(true, { isAuthor: false, isAdmin: true }),
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

      send(sanitizeComment(updatedComment), { count: 1 })
    },
  ],
  DELETE: [
    validate({
      query: {
        commentId: idValidator.required(),
      },
    }),
    auth(true, { isAuthor: true, isAdmin: false }),
    async ({
      send,
      input: {
        query: { commentId },
      },
      models: { CommentModel },
      res,
    }) => {
      try {
        const deletedComment = await CommentModel.query()
          .findById(commentId)
          .withGraphFetched("[user,post.user]")
          .throwIfNotFound()

        await CommentModel.query().deleteById(commentId)
        send(sanitizeComment(deletedComment), { count: 1 })
      } catch (error) {
        res.status(HTTP_CODES.NOT_FOUND).send("Comment not found")
      }
    },
  ],
})

export default handler
