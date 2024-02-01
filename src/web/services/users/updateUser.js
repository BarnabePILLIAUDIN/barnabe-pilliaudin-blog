import request from "@/web/services/request"
import handleExpiredSession from "@/web/utils/handleExpiredSession"

const updateFunction = (id, values) => async () =>
  await request(`users/${id}`, "PATCH", {
    ...values,
  })
const updateUser = async (id, values, router) =>
  await handleExpiredSession(updateFunction(id, values), router)

export default updateUser
