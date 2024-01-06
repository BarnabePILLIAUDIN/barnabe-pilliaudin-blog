import sanitizePost from "@/api/utils/sanitizePost"

const sanitizePosts = (posts) => posts.map((post) => sanitizePost(post))

export default sanitizePosts
