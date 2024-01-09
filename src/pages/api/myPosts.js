import HttpNotFoundError from "@/api/errors/HttpNotFoundError"
import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"

import mw from "@/api/mw"
import { pageValidator } from "@/utils/validators"

const handler = mw({
  GET: [
    validate({
      query: {
        page: pageValidator.required(),
      },
    }),
    auth(true, { isAuthor: false, isAdmin: false }),
    async ({
      send,
      user,
      models: { PostModel, CommentModel },
      input: {
        query: { page },
      },
    }) => {
      if (!user && !user.id) {
        throw new HttpNotFoundError("User not found")
      }

      const query = PostModel.query()
      const posts = await query
        .clone()
        .where("userId", user.id)
        .withGraphFetched("[comments.[user],user]")
        .page(page)
      const [{ count: PostCount }] = await query
        .clone()
        .where("userId", user.id)
        .count()
      const [{ count: CommentCount }] = await CommentModel.query()
        .clone()
        .where("userId", user.id)
        .count()

      send(posts, { PostCount, CommentCount })
    },
  ],
})

export default handler
