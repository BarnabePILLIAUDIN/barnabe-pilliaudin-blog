import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  titleValidator,
  contentValidator,
  tokenValidator,
} from "@/utils/validator"

const handler = mw({
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
      token,
    }) => {
      console.log(PostModel)
      console.log(title, content, user.id)

      try {
        const newPost = await PostModel.query().insertAndFetch({
          title,
          content,
          userId: user.id,
        })

        console.log(newPost)

        if (token) {
          send(newPost, { count: 1 }, token)
        }

        send(newPost, { count: 1 })
      } catch (err) {
        console.log(err)
      }
    },
  ],
})

export default handler
