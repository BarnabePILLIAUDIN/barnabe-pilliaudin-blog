import request from "@/web/services/request"

const getPostById = async (id) => await request(`posts/${id}`)

export default getPostById
