import { useSession } from "@/web/components/SessionContext"
import Button from "@/web/components/ui/Button"
import Link from "next/link"

const NavBar = () => {
  const { session, signOut } = useSession()

  return (
    <>
      <nav className="flex justify-between items-center py-8 px-8 border-b-4 border-black mb-4">
        <h1 className="text-4xl font-extrabold">
          <Link href="/">Blog</Link>
        </h1>
        <ul className="flex gap-5 text-xl font-bold items-center">
          {session ? (
            <>
              <li>
                <Link href="/my-account">My account</Link>
              </li>
              {session.isAuthor && (
                <li>
                  <Link href="/post/create">Create a post</Link>
                </li>
              )}
              {session.isAdmin && (
                <li>
                  <Link href="/admin">Dashboard</Link>
                </li>
              )}
              <li>
                <Button onClick={signOut}>Sign out</Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/sign-in">Sign in</Link>
              </li>
              <li>
                <Link href="/sign-up">Sign up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  )
}

export default NavBar
