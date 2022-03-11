import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Lottie from "lottie-react";
import spinnerData from "../../assets/json/spinner.json";
import { API, setAuthToken } from "../../utils/api";
import { UserContext } from "../../context/UserContext";
import Alert from "./Alert";

Modal.setAppElement("#__next");

export default function AuthModal() {
  const router = useRouter();
  const { state, dispatch } = useContext(UserContext);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  // store data with useState as form
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  const { fullName, email, password, phone } = form;

  // handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (router.query.a === "register") {
      const body = JSON.stringify({ fullName, email, password, phone });
      // insert data to API
      API.post("/register", body, config)
        .then((res) => {
          setLoading(false);
          setAlert({
            status: "success",
            message:
              "You have been registered, You will be redirected to login page",
          });
          setTimeout(() => {
            setAlert(null);
            router.push("?a=login", "/login");
          }, 5000);
        })
        .catch((err) => {
          if (err.response) {
            setLoading(false);
            setAlert(err.response.data);
          }
        });
    } else if (router.query.a === "login") {
      const body = JSON.stringify({ email, password });
      // insert data to API
      API.post("/login", body, config)
        .then((res) => {
          setLoading(false);
          dispatch({
            type: "LOGIN",
            payload: res.data.data,
          });
          setAuthToken(res.data.data.token);
          // Redirect to home page or admin page
          router.push("/");
        })
        .catch((err) => {
          if (err.response) {
            setLoading(false);
            if (err.response.data.details) {
              setAlert(err.response.data.details[0]);
            } else {
              setAlert(err.response.data);
            }
          }
        });
    }
  };
  return (
    <Modal
      isOpen={router.query.a && true}
      onRequestClose={() => router.back()}
      contentLabel="Auth Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          height: "100%",
          zIndex: "10",
        },
        content: {
          borderColor: "transparent",
          backgroundColor: "transparent",
        },
      }}
    >
      <div className="relative px-8 py-3 sm:w-[480px] mx-auto text-center bg-white dark:bg-black rounded-md shadow-2xl">
        <div className="absolute top-0 left-0">
          <Image
            width={57}
            height={153}
            src="/img/atlas.png"
            alt="atlas"
            className="rounded-md"
          />
        </div>
        <div className="absolute top-0 right-0">
          <Image
            width={111}
            height={174}
            src="/img/leaf2.png"
            alt="leaf"
            className="rounded-md"
          />
        </div>
        <div className="absolute top-4 right-4 justify-end">
          <button
            type="button"
            className="text-gray-200 bg-emerald-700 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            onClick={() => router.back()}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <h2 className="text-3xl dark:text-white font-product font-semibold mt-4 mb-2">
          {router.query.a === "login" ? "Login" : "Register"}
        </h2>
        <Alert alert={alert} setAlert={setAlert} />
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            {router.query.a === "register" && (
              <div className="text-left space-y-2">
                <label
                  htmlFor="fullName"
                  className="font-avenir font-semibold dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={fullName}
                  onChange={handleChange}
                  className="bg-platinum dark:bg-eerie dark:text-white px-4 py-2 w-full rounded-sm"
                />
              </div>
            )}
            <div className="text-left space-y-2">
              <label
                htmlFor="email"
                className="font-avenir font-semibold dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleChange}
                className="bg-platinum dark:bg-eerie dark:text-white px-4 py-2 w-full rounded-sm"
              />
            </div>
            <div className="text-left space-y-2">
              <label
                htmlFor="password"
                className="font-avenir font-semibold dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handleChange}
                className="bg-platinum dark:bg-eerie dark:text-white px-4 py-2 w-full rounded-sm"
              />
            </div>
            {router.query.a === "register" && (
              <div className="text-left space-y-2">
                <label
                  htmlFor="phone"
                  className="font-avenir font-semibold dark:text-white"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={handleChange}
                  className="bg-platinum dark:bg-eerie dark:text-white px-4 py-2 w-full rounded-sm"
                />
              </div>
            )}
          </div>
          {loading ? (
            <button
              type="submit"
              className="w-full bg-sky-800 py-2 mt-8 text-white font-product rounded-sm"
              disabled
            >
              <Lottie
                animationData={spinnerData}
                autoplay
                loop
                className="h-6"
              />
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-bleude hover:bg-sky-700 active:bg-sky-900 py-2 mt-8 text-white font-product rounded-sm"
            >
              {router.query.a === "login" ? "Login" : "Register"}
            </button>
          )}
        </form>
        {router.query.a === "login" ? (
          <h6 className="text-lg dark:text-white font-avenir my-4">
            Dont have an Account? Click{" "}
            <Link href="?a=register" as="/register">
              <a className="text-bleude font-black">Here</a>
            </Link>
          </h6>
        ) : (
          <h6 className="text-lg dark:text-white font-avenir my-4">
            Already have an Account? Click{" "}
            <Link href="?a=login" as="/login">
              <a className="text-bleude font-black">Here</a>
            </Link>
          </h6>
        )}
      </div>
    </Modal>
  );
}
