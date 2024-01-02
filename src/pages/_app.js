import "@/styles/globals.css"
import NavBar from "@/web/components/NavBar"
import { SessionContextProvider } from "@/web/components/SessionContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()
const App = ({ Component, pageProps }) => (
  <div>
    <SessionContextProvider>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionContextProvider>
  </div>
)

export default App
