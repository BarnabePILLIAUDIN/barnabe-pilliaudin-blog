import Button from "@/web/components/ui/Button"
import { useRouter } from "next/router"
import deleteUser from "@/web/services/users/deleteUser"
import { useCallback } from "react"
import webConfig from "@/web/webConfig"
import toggleBanUser from "@/web/services/users/toggleBanUser"
import toggleIsAuthor from "@/web/services/users/toggleIsAuthor"
import toggleIsAdmin from "@/web/services/users/toggleIsAdmin"
import { PencilIcon } from "@heroicons/react/24/outline"

const cellClass = "border-2 border-black p-2"
const UserRow = ({ user, fetchUsers }) => {
  const router = useRouter()
  const handleToggle = (toggleFn) => async () => {
    const token = localStorage.getItem(webConfig.security.session.cookie.key)
    await toggleFn(token, router, user)
    await fetchUsers()
  }
  const handleDeleteUser = handleToggle(deleteUser)
  const handleToggleBanUser = handleToggle(toggleBanUser)
  const handleToggleIsAuthor = handleToggle(toggleIsAuthor)
  const handleToggleIsAdmin = handleToggle(toggleIsAdmin)
  const handleRedirectToEditUser = useCallback(() => {
    router.push(`/admin/edit-user/${user.id}`)
  }, [router, user.id])

  return (
    <tr key={user.id}>
      <td className={cellClass}>
        <button onClick={handleRedirectToEditUser}>
          <PencilIcon width={webConfig.icon.s} height={webConfig.icon.s} />
        </button>
      </td>
      <td className={cellClass}>{user.firstName}</td>
      <td className={cellClass}>{user.lastName}</td>
      <td className={cellClass} onClick={handleToggleBanUser}>
        <Button variant={"dark"}>{user.isActive ? "ban" : "unban"}</Button>
      </td>
      <td className={cellClass} onClick={handleDeleteUser}>
        <Button variant={"error"}>Delete user</Button>
      </td>
      <td className={cellClass}>
        <Button
          variant={user.isAuthor ? "error" : "secondary"}
          onClick={handleToggleIsAuthor}
        >
          {user.isAuthor ? "Remove author" : "Promote Author"}
        </Button>
      </td>
      <td className={cellClass}>
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
