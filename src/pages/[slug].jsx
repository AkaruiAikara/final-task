import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { API } from "../utils/api";
import { UserContext } from "../context/UserContext";
import Image from "next/image";
import Layout from "../components/Layout";

export default function Journey() {
  const [loading, setLoading] = useState(true);
  const [journey, setJourney] = useState(null);
  const router = useRouter();
  const { slug } = router.query;
  // get journey
  const getJourney = async () => {
    const { data } = await API.get(`/journeys/${slug}`);
    return data;
  };
  useEffect(() => {
    getJourney()
      .then((data) => {
        setJourney(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Layout title="Journey">
      {loading ? (
        <div className="my-8 flex flex-col justify-start gap-8 animate-pulse duration-100">
          <h1 className="h-12 bg-white dark:bg-black w-full rounded-full"></h1>
          <div className="h-[1080px] bg-white dark:bg-black rounded-2xl"></div>
          <div className="flex flex-col justify-start gap-4">
            <div className="h-4 bg-white dark:bg-black rounded-full"></div>
            <div className="h-4 bg-white dark:bg-black rounded-full"></div>
            <div className="h-4 bg-white dark:bg-black rounded-full"></div>
            <div className="h-4 bg-white dark:bg-black rounded-full"></div>
            <div className="h-4 bg-white dark:bg-black rounded-full w-1/2"></div>
            <div className="h-4 bg-white dark:bg-black rounded-full"></div>
            <div className="h-4 bg-white dark:bg-black rounded-full"></div>
            <div className="h-4 bg-white dark:bg-black rounded-full"></div>
            <div className="h-4 bg-white dark:bg-black rounded-full"></div>
            <div className="h-4 bg-white dark:bg-black rounded-full w-1/2"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div className="space-y-4 my-8">
              <h1 className="text-4xl dark:text-gray-200 font-avenir font-black">
                {journey.title}
              </h1>
              <span className="text-lg text-bleude font-product">
                {new Date(journey.createdAt).toLocaleString()}
              </span>
            </div>
            <h6 className="text-lg dark:text-gray-200 font-avenir">
              {journey.user.fullName}
            </h6>
          </div>
          <Image
            src={process.env.SERVER_URL + journey.image}
            width={1920}
            height={1080}
            objectFit="cover"
            alt="thumbnail"
            onLoadingComplete={(e) => {
              setLoading(false);
            }}
            className="rounded-lg"
          />
          <article className="prose lg:prose-xl dark:prose-invert max-w-full dark:text-gray-200 my-12">
            <div dangerouslySetInnerHTML={{ __html: journey.description }} />
          </article>
        </>
      )}
    </Layout>
  );
}
