import request from "@/web/services/request"

const createSession = async (values) =>
  await request("sessions", "POST", values)

export default createSession
