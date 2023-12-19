import NavBar from "@/web/components/NavBar"
import { Html, Head, Main, NextScript } from "next/document"

const Document = () => (
  <Html lang="en">
    <Head />
    <body>
      <header>
        <NavBar />
      </header>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
