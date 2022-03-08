import Head from "next/head";
import Navbar from "./ui/Navbar";
import { ThemeProvider } from "../context/ThemeContext";

export default function Layout({ children, title }) {
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
          <div className="container">{children}</div>
        </main>
      </ThemeProvider>
    </>
  );
}
