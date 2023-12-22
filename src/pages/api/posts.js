import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import sanitizePosts from "@/api/utils/sanitizePosts"
import {
  titleValidator,
  contentValidator,
  tokenValidator,
} from "@/utils/validator"

const handler = mw({
  GET: [
    async ({ send, models: { PostModel } }) => {
      const posts = await PostModel.query().withGraphFetched("[comments,user]")
      const sanitizedPosts = sanitizePosts(posts)
      send(sanitizedPosts, { count: posts.length })
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
    auth(),
    async ({
      send,
      user,
      input: {
        body: { title, content },
      },
      models: { PostModel },
    }) => {
      const newPost = await PostModel.query().insertAndFetch({
        title,
        content,
        userId: user.id,
      })

      send(newPost, { count: 1 })
    },
  ],
})

export default handler
