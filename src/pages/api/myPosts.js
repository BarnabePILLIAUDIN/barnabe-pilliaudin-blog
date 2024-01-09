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
      const posts = await query
        .clone()
        .where("userId", user.id)
        .withGraphFetched("[comments.[user],user]")
      const [{ count: PostCount }] = await query
        .clone()
        .where("userId", user.id)
        .count()
      const [{ count: CommentCount }] = await CommentModel.query()
        .where("userId", user.id)
        .count()

      send(posts, { PostCount, CommentCount })
    },
  ],
})

export default handler
