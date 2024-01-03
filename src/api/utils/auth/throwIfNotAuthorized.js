import HttpAuthenticationError from "@/api/errors/HttpAuthenticationError"

const throwIfNotAuthorized = (requiredAuthorisation, dbUser) => {
  if (!dbUser) {
    throw new HttpAuthenticationError("Invalid credentials.")
  }

  if (!dbUser.isActive) {
    throw new HttpAuthenticationError("You have been banned from the blog")
  }

  if (requiredAuthorisation.isAuthor && !dbUser.isAuthor) {
    throw new HttpAuthenticationError("You are not allowed to do that.")
  }

  if (requiredAuthorisation.isAdmin && !dbUser.isAdmin) {
    throw new HttpAuthenticationError("You are not allowed to do that.")
  }
}

export default throwIfNotAuthorized
