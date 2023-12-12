import HttpPublicError from "@/api/errors/HttpPublicError"
import HTTP_ERRORS from "@/api/httpCodes"

export class HttpArgumentsError extends HttpPublicError {
  statusCode = HTTP_ERRORS.UNPROCESSABLE_ENTITY

  constructor(errors) {
    super(
      !errors
        ? "Invalid arguments."
        : `Invalid arguments:\n\t${errors.join("\n\t")}`.trim(),
    )
  }
}
