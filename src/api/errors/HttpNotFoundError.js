import HttpPublicError from "@/api/errors/HttpPublicError"
import HTTP_CODES from "@/api/httpCodes"

class HttpNotFoundError extends HttpPublicError {
  constructor(message) {
    super(message)
    this.code = HTTP_CODES.NOT_FOUND
  }
}

export default HttpNotFoundError
