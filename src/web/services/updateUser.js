import request from "@/web/services/request"

const updateUser = async (id, values) =>
  await request(`users/${id}`, "PATCH", {
    ...values,
  })

export default updateUser
