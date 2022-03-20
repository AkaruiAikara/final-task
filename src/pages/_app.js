import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { UserProvider } from "../context/UserContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <NextNProgress />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
