const sanitizeUser = ({
  hashedPassword: _hashedPassword,
  salt: _salt,
  ...sanitizedUser
}) => sanitizedUser

export default sanitizeUser
