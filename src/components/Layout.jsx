import Head from "next/head";
import { useRouter } from "next/router";
import { Navbar } from "./ui";
import { ThemeProvider } from "../context/ThemeContext";

export default function Layout({ children, title }) {
  const router = useRouter();
  return (
    <>
      <ThemeProvider>
        <Head>
          <title>{title && `${title} | `}The Journey</title>
          <meta name="description" content="The Journey you ever dreamed of" />
          <link rel="icon" href="/img/logo.png" />
        </Head>
        <main>
          <Navbar />
          <div className={router.pathname === "/" ? "" : "container"}>
            {children}
          </div>
        </main>
      </ThemeProvider>
    </>
  );
}
