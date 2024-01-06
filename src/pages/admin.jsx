import { useSession } from "@/web/components/SessionContext"
import ForbiddenMessage from "@/web/components/ui/ForbiddenMessage"
import getUsers from "@/web/services/getUsers"

const Dashboard = async () => {
  const { session } = useSession()
  const users = await getUsers()

  if (!session || !session.isAdmin) {
    return (
      <ForbiddenMessage message="You are not allowed to access this page" />
    )
  }

  return (
    <div>
      <h2 className="text-center mt-5 font-bold text-xl">Admin dashboard</h2>
      <div></div>
    </div>
  )
}

export default Dashboard
