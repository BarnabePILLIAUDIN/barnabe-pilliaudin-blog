import knexfile from "../../knexfile.mjs"

const apiConfig = {
  db: knexfile,
  security: {
    jwt: {
      secret: process.env.SECURITY__JWT__JWT_SECRET,
      expiresIn: "1d",
    },
  },
}

export default apiConfig
