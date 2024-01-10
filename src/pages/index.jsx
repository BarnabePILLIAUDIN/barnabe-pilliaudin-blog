import { pageValidator } from "@/utils/validators"
import PostCard from "@/web/components/post/PostCard"
import Pagination from "@/web/components/ui/Pagination"
import getPosts from "@/web/services/getPosts"

export const getServerSideProps = async ({ query: { page } }) => {
  const sanitizedPage = page ?? 1
  const {
    data: {
      result: latestPosts,
      meta: { count },
    },
  } = await getPosts(sanitizedPage)

  return {
    props: {
      latestPosts,
      count,
      page: pageValidator.validateSync(sanitizedPage),
    },
  }
}
const Home = ({ latestPosts, page, count }) => (
  <main className="pb-5 mt-5">
    <h1 className="text-center font-extrabold text-6xl ">Home</h1>
    <h2 className="mx-6 mt-8 font-extrabold text-3xl mb-5">Latest posts</h2>
    <section className="flex flex-col gap-5">
      {latestPosts.map((post) => (
        <PostCard key={`${post.id}-${post.createdAt}`} post={post} />
      ))}
    </section>
    <div className="mt-8 flex justify-center">
      <Pagination pathname="/" page={page} countPages={count} />
    </div>
  </main>
)

export default Home
