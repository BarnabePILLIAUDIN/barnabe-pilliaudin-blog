import HttpPublicError from "@/api/errors/HttpPublicError"
import HTTP_CODES from "@/api/httpCodes"

class HttpAuthenticationError extends HttpPublicError {
  statusCode = HTTP_CODES.UNAUTHORIZED
}

export default HttpAuthenticationError
