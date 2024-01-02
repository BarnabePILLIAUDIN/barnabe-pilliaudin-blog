import axios from "axios"

const getLatestPosts = async () =>
  await axios.get("http://localhost:3000/api/posts")

export default getLatestPosts
