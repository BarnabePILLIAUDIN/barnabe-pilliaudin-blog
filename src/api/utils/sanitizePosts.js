const sanitizePosts = (posts) =>
  posts.map(
    ({
      userId: _userId,
      user: { hashedPassword: _hashedPassword, salt: _salt, ...sanitizedUser },
      ...sanitizedPost
    }) => ({ ...sanitizedPost, user: sanitizedUser }),
  )

export default sanitizePosts
