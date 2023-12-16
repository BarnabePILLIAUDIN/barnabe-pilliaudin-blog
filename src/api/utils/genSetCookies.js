import apiConfig from "@/api/apiConfig"
import genCookies from "@/api/utils/genCookies"
import webConfig from "@/web/webConfig"
import ms from "ms"

const genSetCookies = (cookieJwt) =>
  genCookies({
    name: webConfig.security.session.cookie.key,
    value: cookieJwt,
    expires: Date.now() + ms(apiConfig.security.jwt.expiresIn),
    path: "/",
    sameSite: "strict",
    httpOnly: true,
    secure: webConfig.security.session.cookie.secure,
  })

export default genSetCookies
