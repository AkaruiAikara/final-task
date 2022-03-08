import Image from "next/image";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";

export default function Navbar() {
  return (
    <nav className="bg-antiflash px-2 sm:px-4 py-3 dark:bg-smokyblack">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/">
          <a className="relative flex items-center">
            <span className="self-center text-3xl font-summer whitespace-nowrap dark:text-white">
              The Journey
            </span>
            <div className="absolute bottom-4 right-24">
              <Image width={16} height={16} src="/img/leaf.png" />
            </div>
            <div className="absolute top-5 right-7">
              <Image width={20} height={20} src="/img/hibiscus.png" />
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
        <div className="inline-flex gap-2 items-center">
          <ThemeToggler />
          <Link href="?a=login" as="/login">
            <a className="w-20 py-1 border-2 font-product border-bleude hover:bg-bleude focus:bg-sky-700 hover:text-white dark:text-white rounded-[4px] text-center text-xs">
              Login
            </a>
          </Link>
          <Link href="?a=register" as="/register">
            <a className="w-20 py-1 border-2 font-product border-bleude bg-bleude hover:bg-sky-700 focus:bg-sky-900 text-white rounded-[4px] text-center text-xs">
              Register
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
