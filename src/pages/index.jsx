import PostCard from "@/web/components/post/PostCard"
import getLatestPosts from "@/web/services/getLatestPosts"

export const getServerSideProps = async () => {
  const { data: latestPosts } = await getLatestPosts()

  return {
    props: {
      latestPosts,
    },
  }
}
const Home = ({ latestPosts }) => (
  <main className="pb-5 mt-5">
    <h1 className="text-center font-extrabold text-6xl ">Home</h1>
    <h2 className="mx-6 mt-8 font-extrabold text-3xl mb-5">Latest posts</h2>
    <section className="flex flex-col gap-5">
      {latestPosts.result.map((post) => (
        <PostCard key={`${post.id}-${post.createdAt}`} post={post} />
      ))}
    </section>
  </main>
)

export default Home
