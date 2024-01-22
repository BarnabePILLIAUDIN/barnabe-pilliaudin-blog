import Link from "next/link"

const UnloggedMyAccount = () => (
  <div className="w-96 mx-auto flex flex-col text-center gap-3">
    <h2 className="text-xl font-bold">
      You need to sign in to see you account
    </h2>
    <Link href="/sign-in" className="underline text-lg font-medium">
      Go to sign in
    </Link>
    <Link href="/sign-up" className="underline text-lg font-medium">
      Go to sign up
    </Link>
  </div>
)

export default UnloggedMyAccount
