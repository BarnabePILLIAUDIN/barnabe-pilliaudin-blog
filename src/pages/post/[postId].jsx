import getPostById from "@/web/services/getPostById"
import { UserCircleIcon } from "@heroicons/react/24/outline"

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
    title,
    content,
    user: { firstName, lastName },
  },
}) => (
  <main className="pb-5 mt-8 mx-5">
    <h2 className="font-extrabold text-4xl ">{title}</h2>
    <div className="flex w-screen gap-3 mt-5 items-center">
      <UserCircleIcon width={50} height={50} />
      <h3 className=" font-medium text-3xl">
        {firstName} {lastName}
      </h3>
    </div>
    <section className="flex flex-col gap-5 mt-7 text-lg">
      <p>{content}</p>
    </section>
  </main>
)

export default PostPage
