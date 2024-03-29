import { useSession } from "@/web/components/SessionContext"
import ForbiddenMessage from "@/web/components/ui/ForbiddenMessage"
import { useCallback, useEffect, useState } from "react"
import getUsers from "@/web/services/users/getUsers"
import webConfig from "@/web/webConfig"
import { useRouter } from "next/router"
import UsersList from "@/web/components/adminDashboard/UsersList"
import Pagination from "@/web/components/ui/Pagination"

export const getServerSideProps = ({ query: { page } }) => ({
  props: {
    page: page ?? 1,
  },
})
const initializeCountState = () => 0
const initializeUsersState = () => []
const Dashboard = ({ page }) => {
  const { session } = useSession()
  const [users, setUser] = useState(initializeUsersState)
  const [userCount, setUserCount] = useState(initializeCountState)
  const router = useRouter()
  const fetchUsers = useCallback(async () => {
    const token = localStorage.getItem(webConfig.security.session.cookie.key)

    try {
      const {
        data: {
          result,
          meta: { count },
        },
      } = await getUsers(token, router, page)
      setUser(result)
      setUserCount(Number.parseInt(count, 10))
    } catch (error) {
      router.push("/expired-session")
    }
  }, [page, router])
  useEffect(() => {
    ;(async () => await fetchUsers())()
  }, [fetchUsers, page])

  if (!session || !session.isAdmin) {
    return (
      <ForbiddenMessage message="You are not allowed to access this page" />
    )
  }

  return (
    <div>
      <h2 className="text-center mt-5 font-bold text-xl">Admin dashboard</h2>
      <UsersList
        users={users}
        fetchUsers={fetchUsers}
        className="mt-5 flex  justify-center"
      />
      <div className="flex justify-center">
        <Pagination
          page={Number.parseInt(page, 10)}
          pathname="/admin"
          countPages={Math.ceil(userCount / webConfig.pagination.limit)}
          className="mt-7 mx-auto"
        />
      </div>
    </div>
  )
}

export default Dashboard
