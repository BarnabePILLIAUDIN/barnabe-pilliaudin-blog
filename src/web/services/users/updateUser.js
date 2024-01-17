import request from "@/web/services/request"
import handleExpiredSession from "@/web/utils/handleExpiredSession"

const update = (id, values) => async () =>
  await request(`users/${id}`, "PATCH", {
    ...values,
  })
const updateUser = async (id, values, router) =>
  await handleExpiredSession(update(id, values), router)

export default updateUser
