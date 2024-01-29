import request from "@/web/services/request"
import handleExpiredSession from "@/web/utils/handleExpiredSession"

const updateFunction = (id, values) => async () =>
  await request(`users/${id}`, "PATCH", {
    ...values,
  })
const updateUser = async (values, router, user) =>
  await handleExpiredSession(updateFunction(user.id, values), router)

export default updateUser
