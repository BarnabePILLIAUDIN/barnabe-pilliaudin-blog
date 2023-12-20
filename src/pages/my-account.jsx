import { useRouter } from "next/router"
import { useSession } from "@/web/components/SessionContext"

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
}
const UserPage = () => {
  const router = useRouter()
  const { session } = useSession()
  const { user } = session

  if (!user) {
    router.push("/sign-in")

    return (
      <>
        <h2>You will be redirected to login</h2>
      </>
    )
  }

  return (
    <>
      <h2>Hello {user.id}</h2>
      <div>
        <h3>Modify my infos</h3>
      </div>
    </>
  )
}

export default UserPage
