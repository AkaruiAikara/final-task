import Modal from "react-modal";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

Modal.setAppElement("#__next");

export default function AuthModal() {
  const router = useRouter();
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
        <h2 className="text-3xl dark:text-white font-product font-semibold my-6">
          {router.query.a === "login" ? "Login" : "Register"}
        </h2>
        <form>
          <div className="space-y-4">
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
                  className="bg-platinum dark:bg-eerie dark:text-white px-4 py-2 w-full rounded-sm"
                />
              </div>
            )}
          </div>
          <button className="w-full bg-bleude hover:bg-sky-700 active:bg-sky-900 py-2 mt-8 text-white font-product font-semibold rounded-sm">
            {router.query.a === "login" ? "Login" : "Register"}
          </button>
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
