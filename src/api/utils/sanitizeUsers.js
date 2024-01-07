import sanitizeUser from "./sanitizeUser"

const sanitizeUsers = (users) => users.map((user) => sanitizeUser(user))

export default sanitizeUsers
