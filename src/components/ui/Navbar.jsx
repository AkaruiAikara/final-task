import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "../../context/UserContext";
import { FaUser, FaFeatherAlt, FaBookmark } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import ThemeToggler from "./ThemeToggler";

export default function Navbar() {
  const ref = useRef(null);
  const excRef = useRef(null);
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
  };
  useOutsideClick(ref, excRef, () => setShowDropDown(false));
  return (
    <nav
      className={`${
        router.pathname === "/"
          ? "absolute bg-transparent z-10 w-full"
          : "bg-antiflash shadow-lg dark:bg-smokyblack"
      } px-2 sm:px-4 py-3`}
    >
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/">
          <a className="relative flex items-center">
            <span
              className={`${
                router.pathname === "/" && "text-white"
              } self-center text-3xl font-summer whitespace-nowrap dark:text-white`}
            >
              The Journey
            </span>
            <div className="absolute bottom-4 right-24">
              <Image width={16} height={16} src="/img/leaf.png" alt="leaf" />
            </div>
            <div className="absolute top-5 right-7">
              <Image
                width={20}
                height={20}
                src="/img/hibiscus.png"
                alt="hibiscus"
              />
            </div>
            <Image
              width={32}
              height={32}
              src="/img/logo.png"
              className="mr-3 h-6 sm:h-10"
              alt="logo"
            />
          </a>
        </Link>
        <div className="inline-flex flex-row gap-2 items-center">
          <ThemeToggler />
          {state.isLogin ? (
            <div className="relative">
              <button
                ref={excRef}
                onClick={() => setShowDropDown(!showDropDown)}
              >
                <Image
                  src={
                    state.user.image
                      ? process.env.SERVER_URL + state.user.image
                      : "/img/avatar.jpg"
                  }
                  width={50}
                  height={50}
                  objectFit="cover"
                  alt="avatar"
                  className="rounded-full hover:brightness-75 active:brightness-50"
                />
              </button>
              <div
                ref={ref}
                className={`${
                  showDropDown ? "absolute right-0 z-10" : "hidden"
                } w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:bg-black dark:divide-gray-600`}
              >
                <div className="py-3 px-4 text-gray-900 dark:text-white">
                  <span className="block text-sm">{state.user.fullName}</span>
                  <span className="block text-sm font-medium truncat">
                    {state.user.email}
                  </span>
                </div>
                <ul
                  className="py-1"
                  aria-labelledby="dropdownInformationButton"
                >
                  <li>
                    <Link href="/profile">
                      <a className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        <div className="flex items-center gap-2">
                          <FaUser />
                          <span>Profile</span>
                        </div>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/journey">
                      <a className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        <div className="flex items-center gap-2">
                          <FaFeatherAlt />
                          <span>New Journey</span>
                        </div>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/bookmarks">
                      <a className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        <div className="flex items-center gap-2">
                          <FaBookmark />
                          <span>Bookmarks</span>
                        </div>
                      </a>
                    </Link>
                  </li>
                </ul>
                <div className="py-1">
                  <a
                    onClick={() => handleLogout()}
                    className="cursor-pointer block py-2 px-4 text-sm text-red-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-200 dark:hover:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <FiLogOut />
                      <span>Logout</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link href="/?a=login" as="/login">
                <a
                  className={`${
                    router.pathname === "/" && "text-white"
                  } sm:w-20 py-1 border-2 font-product border-bleude hover:bg-bleude focus:bg-sky-700 hover:text-white dark:text-white rounded-[4px] text-center text-xs`}
                >
                  Login
                </a>
              </Link>
              <Link href="/?a=register" as="/register">
                <a className="sm:w-20 py-1 border-2 font-product border-bleude bg-bleude hover:bg-sky-700 focus:bg-sky-900 text-white rounded-[4px] text-center text-xs">
                  Register
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

// hook that hide dropdown menu when clicked outside of it
const useOutsideClick = (ref, excRef, callback) => {
  useEffect(() => {
    if (ref.current && excRef.current) {
      const handleClick = (e) => {
        try {
          if (
            !ref.current.contains(e.target) &&
            !excRef.current.contains(e.target)
          ) {
            callback();
          }
        } catch (error) {
          return;
        }
      };

      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }
  }, [ref, callback]); // eslint-disable-line
};
