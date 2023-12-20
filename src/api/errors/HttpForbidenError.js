const { default: HttpPublicError } = require("@/api/errors/HttpPublicError")
const { default: HTTP_CODES } = require("@/api/httpCodes")

class HttpForbiddenError extends HttpPublicError {
  statusCode = HTTP_CODES.FORBIDDEN
}

export default HttpForbiddenError
