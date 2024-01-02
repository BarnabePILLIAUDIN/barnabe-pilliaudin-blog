import axios from "axios"

const getPostById = async (id) =>
  await axios.get(`http://localhost:3000/api/posts/${id}`)

export default getPostById
