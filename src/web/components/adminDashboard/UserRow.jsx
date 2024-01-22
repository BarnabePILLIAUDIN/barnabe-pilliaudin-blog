import Button from "@/web/components/ui/Button"
import { useRouter } from "next/router"
import deleteUser from "@/web/services/users/deleteUser"
import { useCallback } from "react"
import webConfig from "@/web/webConfig"
import toggleBanUser from "@/web/services/users/toggleBanUser"
import toggleIsAuthor from "@/web/services/users/toggleIsAuthor"
import toggleIsAdmin from "@/web/services/users/toggleIsAdmin"

const UserRow = ({ user, fetchUsers }) => {
  const router = useRouter()
  const handleDeleteUser = useCallback(async () => {
    const token = localStorage.getItem(webConfig.security.session.cookie.key)
    await deleteUser(user.id, token, router)
    await fetchUsers()
  }, [])
  const handleToggleBanUser = useCallback(async () => {
    const token = localStorage.getItem(webConfig.security.session.cookie.key)
    await toggleBanUser(user, token, router)
    await fetchUsers()
  }, [])
  const handleToggleIsAuthor = useCallback(async () => {
    const token = localStorage.getItem(webConfig.security.session.cookie.key)
    await toggleIsAuthor(user, token, router)
    await fetchUsers()
  }, [])
  const handleToggleIsAdmin = useCallback(async () => {
    const token = localStorage.getItem(webConfig.security.session.cookie.key)
    await toggleIsAdmin(user, token, router)
    await fetchUsers()
  }, [])

  return (
    <tr key={user.id}>
      <td className="border-2 border-black p-2">{user.firstName}</td>
      <td className="border-2 border-black p-2">{user.lastName}</td>
      <td className="border-2 border-black p-2" onClick={handleToggleBanUser}>
        <Button variant={"dark"}>{user.isActive ? "ban" : "unban"}</Button>
      </td>
      <td className="border-2 border-black p-2" onClick={handleDeleteUser}>
        <Button variant={"error"}>Delete user</Button>
      </td>
      <td className="border-2 border-black p-2">
        <Button
          variant={user.isAuthor ? "error" : "secondary"}
          onClick={handleToggleIsAuthor}
        >
          {user.isAuthor ? "Remove author" : "Promote Author"}
        </Button>
      </td>
      <td className="border-2 border-black p-2">
        <Button
          variant={user.isAdmin ? "error" : "secondary"}
          onClick={handleToggleIsAdmin}
        >
          {user.isAdmin ? " Remove admin" : "Promote admin"}
        </Button>
      </td>
    </tr>
  )
}
export default UserRow
