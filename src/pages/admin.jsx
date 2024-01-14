import { useSession } from "@/web/components/SessionContext"
import ForbiddenMessage from "@/web/components/ui/ForbiddenMessage"

const Dashboard = () => {
  const { session } = useSession()

  if (!session || !session.isAdmin) {
    return (
      <ForbiddenMessage message="You are not allowed to access this page" />
    )
  }

  return (
    <div>
      <h2 className="text-center mt-5 font-bold text-xl">Admin dashboard</h2>
    </div>
  )
}

export default Dashboard
