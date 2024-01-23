import CommentSection from "@/web/components/comments/CommentSection"
import getPostById from "@/web/services/posts/getPostById"
import { EyeIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import Button from "@/web/components/ui/Button"
import deletePost from "@/web/services/posts/deletePost"
import { useCallback } from "react"
import { useRouter } from "next/navigation"
import webConfig from "@/web/webConfig"
import { useSession } from "@/web/components/SessionContext"

export const getServerSideProps = async ({ query: { postId } }) => {
  const {
    data: {
      result: [post],
    },
  } = await getPostById(postId)

  return {
    props: {
      post,
    },
  }
}
const PostPage = ({
  post: {
    id,
    title,
    content,
    user: { firstName, lastName },
    comments,
    views,
  },
}) => {
  const router = useRouter()
  const { session } = useSession()
  const handleDeletePost = useCallback(async () => {
    const token = localStorage.getItem(webConfig.security.session.cookie.key)
    await deletePost(id, token, router)
    router.push("/")
  }, [])
  const handleRedirectToEditPost = useCallback(() => {
    router.push(`/post/edit/${id}`)
  }, [])

  return (
    <main className="pb-5 mt-8 mx-5 px-5">
      <section>
        <h2 className="font-extrabold text-4xl ">{title}</h2>
        <div className="flex w- gap-3 mt-5 items-center">
          <UserCircleIcon width={50} height={50} />
          <h3 className=" font-medium text-3xl">
            {firstName} {lastName}
          </h3>
        </div>
      </section>
      <p className="flex flex-col gap-5 mt-7 text-lg">{content}</p>
      {session && session.isAuthor && (
        <section className="flex flex-col w-56 gap-3 mt-5">
          <Button variant="error" onClick={handleDeletePost}>
            Delete post
          </Button>
          <Button variant="dark" onClick={handleRedirectToEditPost}>
            Edit post
          </Button>
        </section>
      )}
      <div className="flex gap-2 items-center mt-5">
        <EyeIcon width={30} height={30} />
        <p className="font-semibold">{views}</p>
      </div>
      <CommentSection comments={comments} postId={id} />
    </main>
  )
}

export default PostPage
