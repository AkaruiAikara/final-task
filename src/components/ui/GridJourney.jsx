import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Lottie from "lottie-react";
import { API } from "../../utils/api";
import { BsBookmarkPlus, BsBookmarkPlusFill } from "react-icons/bs";
import { UserContext } from "../../context/UserContext";
import { stripehtml, truncate } from "../../utils/string";
import spinnerData from "../../assets/json/spinner.json";

export default function GridJourney({ journey }) {
  const router = useRouter();
  const [isMarked, setIsMarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { state } = useContext(UserContext);
  const { bookmarks } = journey;
  const userBookmark = bookmarks.find(
    (bookmark) => bookmark.userId === state.user.id
  );
  // handle bookmark
  const handleBookmark = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (!state.isLogin) {
      setLoading(false);
      return router.push("?a=login", "/login");
    }
    if (isMarked) {
      await API.delete(`/bookmarks/${state.user.id}/${journey.id}`);
      setIsMarked(false);
      setLoading(false);
    } else {
      await API.post("/bookmarks", {
        journeyId: journey.id,
        userId: state.user.id,
      });
      setIsMarked(true);
      setLoading(false);
    }
  };
  const striped = stripehtml(journey.description);
  const description = truncate(striped);
  useEffect(() => {
    if (userBookmark) {
      setIsMarked(true);
    } else {
      setIsMarked(false);
    }
  }, [userBookmark]);
  return (
    <div
      key={journey.id}
      className="relative bg-white dark:bg-black hover:ring rounded-md shadow-lg"
    >
      <div className="relative w-full h-[180px] object-cover">
        <Image
          src={process.env.SERVER_URL + journey.image}
          layout="fill"
          objectFit="cover"
          alt="thumbnail"
          className="rounded-t-md"
        />
      </div>
      {router.pathname === "/bookmarks" ? null : (
        <button
          onClick={() => handleBookmark()}
          className="absolute z-[3] p-3 bg-white opacity-75 hover:opacity-90 backdrop-blur-md backdrop-saturate-200 shadow-2xl top-0 right-0 rounded-full"
        >
          {loading ? (
            <Lottie animationData={spinnerData} autoplay loop className="h-4" />
          ) : isMarked ? (
            <BsBookmarkPlusFill className="opacity-100 text-black" />
          ) : (
            <BsBookmarkPlus className="opacity-100 text-black" />
          )}
        </button>
      )}
      <Link href={"/" + journey.slug}>
        <a className="font-product group">
          <div className="p-4">
            <h4 className="text-lg dark:text-white font-semibold group-hover:underline">
              {truncate(journey.title, 32)}
            </h4>
            <span className="text-gray-400 text-sm py-2 group-hover:underline">
              {new Date(journey.createdAt).toLocaleDateString()}{" "}
              {journey.user.fullName}
            </span>
            <h6 className="text-sm dark:text-white py-2 text-justify group-hover:underline">
              {description}
            </h6>
          </div>
        </a>
      </Link>
    </div>
  );
}
