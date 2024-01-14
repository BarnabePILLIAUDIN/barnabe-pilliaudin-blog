import request from "@/web/services/request"

const getUsers = async () => await request("users")

export default getUsers
