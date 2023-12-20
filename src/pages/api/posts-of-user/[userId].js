import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import sanitizePosts from "@/api/utils/sanitizePosts"
import { idValidator } from "@/utils/validator"

const handler = mw({
  GET: [
    validate({
      query: {
        userId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { userId },
      },
      models: { PostModel },
    }) => {
      const posts = await PostModel.query()
        .where({ userId })
        .withGraphFetched("[comments,user]")
      const sanitizedPosts = sanitizePosts(posts)

      send(sanitizedPosts, { count: posts.length })
    },
  ],
})

export default handler
