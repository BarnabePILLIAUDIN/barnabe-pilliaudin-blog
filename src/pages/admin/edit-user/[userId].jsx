import { useSession } from "@/web/components/SessionContext"
import AdminEditUser from "@/web/components/adminDashboard/AdminEditUser"
import ForbiddenMessage from "@/web/components/ui/ForbiddenMessage"
import getUserById from "@/web/services/users/getUserById"
import webConfig from "@/web/webConfig"
import { useQuery } from "@tanstack/react-query"

export const getServerSideProps = ({ query: { userId } }) => ({
  props: {
    userId,
  },
})
const EditUser = ({ userId }) => {
  const { session } = useSession()
  const { isLoading, data } = useQuery({
    queryKey: [`user/${userId}`],
    queryFn: async () => {
      const token = localStorage.getItem(webConfig.security.session.cookie.key)
      const {
        data: {
          result: [user],
        },
      } = await getUserById(userId, token)

      return user
    },
  })

  if (!session || !session.isAdmin) {
    return (
      <ForbiddenMessage message="You are not allowed to access this page" />
    )
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  console.log(data)

  return <AdminEditUser user={data} />
}

export default EditUser
