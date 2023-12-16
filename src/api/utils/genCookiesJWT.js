import apiConfig from "@/api/apiConfig"
import webConfig from "@/web/webConfig"
import jsonwebtoken from "jsonwebtoken"
const genCookiesJwt = (token) =>
  jsonwebtoken.sign(
    {
      token: { [webConfig.security.session.cookie.key]: token },
    },
    apiConfig.security.jwt.secret,
    {
      expiresIn: apiConfig.security.jwt.expiresIn,
    },
    {},
  )

export default genCookiesJwt
