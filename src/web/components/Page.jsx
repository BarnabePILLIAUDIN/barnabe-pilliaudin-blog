import NavBar from "@/web/components/NavBar"
const Page = ({ children, ...otherProps }) => (
  <>
    <NavBar />
    <main {...otherProps}>{children}</main>
  </>
)

export default Page
