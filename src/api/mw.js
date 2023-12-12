import { createContext } from "@/api/createContext"
import HttpPublicError from "@/api/errors/HttpPublicError"
import PublicError from "@/api/errors/PublicError"
import HTTP_ERRORS from "@/api/httpCodes"

const handleError = (err, { res }) => {
  if (!(err instanceof PublicError)) {
    res
      .status(HTTP_ERRORS.INTERNAL_SERVER_ERROR)
      .send({ error: "Something went wrong." })

    return
  }

  if (err instanceof HttpPublicError) {
    res.status(err.statusCode)
  }

  res.send({ error: err.message })
}
const mw = (methodHandlers) => async (req, res) => {
  const handlers = methodHandlers[req.method.toUpperCase()]

  if (!handlers) {
    res
      .status(HTTP_ERRORS.METHOD_NOT_ALLOWED)
      .send({ error: "Method not allowed" })
  }

  let currentHandlerIndex = -1
  const next = async () => {
    currentHandlerIndex += 1
    const handleNext = handlers[currentHandlerIndex]

    await handleNext(ctx)
  }
  const ctx = createContext({
    req,
    res,
    next,
  })

  try {
    await next()
  } catch (err) {
    await handleError(err, ctx)
  } finally {
    await ctx.db.destroy()
  }
}

export default mw
