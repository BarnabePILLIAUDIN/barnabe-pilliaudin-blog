import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import sanitizePost from "@/api/utils/sanitizePost"
import sanitizePosts from "@/api/utils/sanitizePosts"
import {
  contentValidator,
  pageValidator,
  titleValidator,
} from "@/utils/validators"

const handler = mw({
  GET: [
    validate({
      query: {
        page: pageValidator.required(),
      },
    }),
    async ({
      send,
      models: { PostModel },
      input: {
        query: { page },
      },
    }) => {
      const query = PostModel.query()
      const posts = await query
        .clone()
        .withGraphFetched("[comments.[user],user]")
        .orderBy("created_at", "desc")
        .page(page)
      const [{ count }] = await query.clone().count()

      send(sanitizePosts(posts), { count })
    },
  ],
  POST: [
    validate({
      body: {
        title: titleValidator.required(),
        content: contentValidator.required(),
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

      // Avoid error in sanitizer
      newPost.comments = []
      send(sanitizePost(newPost), { count: 1 })
    },
  ],
})

export default handler
