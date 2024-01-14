import HttpNotFoundError from "@/api/errors/HttpNotFoundError"
import auth from "@/api/middlewares/auth"

import mw from "@/api/mw"

const handler = mw({
  GET: [
    auth(true, { isAuthor: false, isAdmin: false }),
    async ({ send, user, models: { PostModel, CommentModel } }) => {
      if (!user && !user.id) {
        throw new HttpNotFoundError("User not found")
      }

      const query = PostModel.query()
      const [{ count: postCount }] = await query
        .clone()
        .where("userId", user.id)
        .count()
      const [{ count: commentCount }] = await CommentModel.query()
        .clone()
        .where("userId", user.id)
        .count()
      const [{ sum: postViews }] = await query.clone().sum("views")

      send({ postCount, postViews, commentCount })
    },
  ],
})

export default handler
