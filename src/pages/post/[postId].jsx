import CommentSection from "@/web/components/comments/CommentSection"
import getPostById from "@/web/services/getPostById"
import { EyeIcon, UserCircleIcon } from "@heroicons/react/24/outline"

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
}) => (
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
    <section className="flex flex-col gap-5 mt-7 text-lg">
      <p>{content}</p>
    </section>
    <div className="flex gap-2 items-center mt-5">
      <EyeIcon width={30} height={30} />
      <p className="font-semibold">{views}</p>
    </div>
    <CommentSection comments={comments} postId={id} />
  </main>
)

export default PostPage
