import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react"
import jsonwebtoken from "jsonwebtoken"
import axios from "axios"

export const useSession = () => useContext(SessionContext)

export const SessionContextProvider = (props) => {
  const [session, setSession] = useState({})
  const signIn = useCallback((jwt) => {
    localStorage.setItem("token", jwt)
    const { payload } = jsonwebtoken.decode(jwt)
    setSession(payload)
  }, [])
  const signOut = useCallback(() => {
    localStorage.removeItem("token")
    axios.delete("/api/sessions")
    setSession({})
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      return
    }

    const { payload } = jsonwebtoken.decode(token)
    setSession(payload)
  }, [])

  return (
    <SessionContext.Provider {...props} value={{ session, signIn, signOut }} />
  )
}
const SessionContext = createContext()
export default SessionContext
