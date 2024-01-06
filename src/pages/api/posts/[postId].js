import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import sanitizeBody from "@/api/utils/auth/sanitizeBody"
import sanitizePosts from "@/api/utils/sanitizePosts"
import {
  contentValidator,
  idValidator,
  titleValidator,
  tokenValidator,
} from "@/utils/validator"

const handler = mw({
  GET: [
    validate({
      query: {
        postId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { postId },
      },
      models: { PostModel },
    }) => {
      const post = await PostModel.query()
        .findById(postId)
        .withGraphFetched("[comments.[user],user]")
        .throwIfNotFound()
      const sanitizedPost = sanitizePosts([post])

      send(sanitizedPost, { count: 1 })
    },
  ],
  PATCH: [
    validate({
      query: {
        postId: idValidator.required(),
      },
      body: {
        title: titleValidator,
        content: contentValidator,
        token: tokenValidator.required(),
      },
    }),
    auth(true, { isAuthor: true, isAdmin: false }),
    async ({
      send,
      input: {
        query: { postId },
        body,
      },
      models: { PostModel },
    }) => {
      const sanitizedBody = sanitizeBody(body)
      const updatedPost = await PostModel.query()
        .updateAndFetchById(postId, {
          ...sanitizedBody,
        })
        .withGraphFetched("[comments.[user],user]")
        .throwIfNotFound()
      const sanitizedPost = sanitizePosts([updatedPost])
      send(sanitizedPost, { count: 1 })
    },
  ],
  DELETE: [
    validate({
      query: {
        postId: idValidator.required(),
      },
      body: {
        token: tokenValidator.required(),
      },
    }),
    auth(true, { isAuthor: true, isAdmin: false }),
    async ({
      models: { PostModel },
      send,
      input: {
        query: { postId },
      },
    }) => {
      const deletedPost = await PostModel.query()
        .deleteById(postId)
        .throwIfNotFound()
      send(deletedPost)
    },
  ],
})

export default handler
