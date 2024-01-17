import Link from "@/web/components/ui/Link"

const ExpiredSession = () => (
  <div className="text-center">
    <p className="text-red-500 font-extrabold text-2xl">
      You session has expired. Please sign in again
    </p>
    <Link href="/sign-in">Go to sign in</Link>
  </div>
)

export default ExpiredSession
