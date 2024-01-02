import webConfig from "@/web/webConfig"
import axios from "axios"
import jsonwebtoken from "jsonwebtoken"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

const SessionContext = createContext()

export const useSession = () => useContext(SessionContext)
export const SessionContextProvider = (props) => {
  const [session, setSession] = useState(null)
  const signIn = useCallback((jwt) => {
    localStorage.setItem(webConfig.security.session.cookie.key, jwt)

    const { payload } = jsonwebtoken.decode(jwt)

    setSession(payload)
  }, [])
  const signOut = useCallback(async () => {
    await axios.delete("/api/sessions")
    localStorage.removeItem(webConfig.security.session.cookie.key)
    setSession(null)
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem(webConfig.security.session.cookie.key)

    if (!jwt) {
      return
    }

    const {
      payload: { user },
    } = jsonwebtoken.decode(jwt)

    setSession(user)
  }, [])

  return (
    <SessionContext.Provider {...props} value={{ session, signIn, signOut }} />
  )
}

export default SessionContext
