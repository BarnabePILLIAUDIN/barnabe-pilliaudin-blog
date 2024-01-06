import request from "@/web/services/request"

const getLatestPosts = async () => await request("posts")

export default getLatestPosts
