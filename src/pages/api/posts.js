import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import sanitizePost from "@/api/utils/sanitizePost"
import sanitizePosts from "@/api/utils/sanitizePosts"
import {
  titleValidator,
  contentValidator,
  tokenValidator,
} from "@/utils/validator"

const handler = mw({
  GET: [
    async ({ send, models: { PostModel } }) => {
      const posts = await PostModel.query()
        .withGraphFetched("[comments.[user],user]")
        .orderBy("created_at", "desc")

      send(sanitizePosts(posts), { count: posts.length })
    },
  ],
  POST: [
    validate({
      body: {
        title: titleValidator.required(),
        content: contentValidator.required(),
        token: tokenValidator.required(),
      },
    }),
    auth(true, { isAuthor: true, isAdmin: false }),
    async ({
      send,
      user,
      input: {
        body: { title, content },
      },
      models: { PostModel },
    }) => {
      const newPost = await PostModel.query()
        .insertAndFetch({
          title,
          content,
          userId: user.id,
        })
        .withGraphFetched("user")

      send(sanitizePost(newPost), { count: 1 })
    },
  ],
})

export default handler
