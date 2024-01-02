import axios from "axios"

const updateUser = async (id, values) =>
  await axios.patch(`http://localhost:3000/api/users/${id}`, {
    ...values,
  })

export default updateUser
