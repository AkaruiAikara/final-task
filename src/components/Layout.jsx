import { useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { API, setAuthToken } from "../utils/api";
import { UserContext } from "../context/UserContext";
import { Navbar, AuthModal } from "./ui";

export default function Layout({ children, title }) {
  const router = useRouter();
  const { dispatch } = useContext(UserContext);
  const checkToken = () => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
      API.get("/check-auth")
        .then((res) => {
          let payload = res.data.data;
          payload.token = localStorage.getItem("token");
          dispatch({
            type: "LOGIN",
            payload,
          });
        })
        .catch((err) => {
          localStorage.removeItem("token");
          dispatch({
            type: "LOGOUT",
          });
        });
    } else {
      dispatch({
        type: "LOGOUT",
      });
    }
  };
  useEffect(() => {
    checkToken();
  }, []);
  return (
    <>
      <Head>
        <title>{title && `${title} | `}The Journey</title>
        <meta name="description" content="The Journey you ever dreamed of" />
        <link rel="icon" href="/img/logo.png" />
      </Head>
      <AuthModal />
      <main>
        <Navbar />
        <div className={router.pathname === "/" ? "" : "container"}>
          {children}
        </div>
        <Toaster />
      </main>
    </>
  );
}
