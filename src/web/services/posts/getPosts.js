import request from "@/web/services/request"

const getPosts = async (page) => await request(`posts?page=${page}`)

export default getPosts
