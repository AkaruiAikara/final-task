import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { ThemeProvider } from "../context/ThemeContext";
import { UserProvider } from "../context/UserContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <NextNProgress />
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
