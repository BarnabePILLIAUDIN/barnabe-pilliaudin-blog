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
    ({ send, user }) => {
      send(user)
    },
  ],
})

export default handler
