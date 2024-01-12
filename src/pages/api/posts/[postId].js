import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import sanitizeBody from "@/api/utils/auth/sanitizeBody"
import sanitizePost from "@/api/utils/sanitizePost"
import {
  contentValidator,
  idValidator,
  titleValidator,
} from "@/utils/validators"

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
      const query = PostModel.query()
      const post = await query
        .clone()
        .findById(postId)
        .withGraphFetched("[comments.[user],user]")
        .throwIfNotFound()

      post.views = Number.parseInt(post.views, 10) + 1
      await query
        .clone()
        .where("id", "=", post.id)
        .update({ views: post.views })
      const sanitizedPost = sanitizePost(post)

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
      const sanitizedPost = sanitizePost(updatedPost)
      send(sanitizedPost, { count: 1 })
    },
  ],
  DELETE: [
    validate({
      query: {
        postId: idValidator.required(),
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
