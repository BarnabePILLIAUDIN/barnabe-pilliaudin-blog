import Link from "@/web/components/ui/Link"

const SuccessFullSignIn = () => (
  <div>
    <h2 className="text-center font-bold text-2xl mt-3">
      You are now signed in where do you want to go?
    </h2>
    <div className="flex flex-col text-center mt-5 gap-2 text-lg font-semibold">
      <Link href="/">Go to home page</Link>
      <Link href="/myAccount">Go to my account</Link>
    </div>
  </div>
)

export default SuccessFullSignIn
