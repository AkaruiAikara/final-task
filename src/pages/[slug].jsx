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
        <h1>Loading...</h1>
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
          <div className="dark:text-gray-200 text-justify my-12">
            <div dangerouslySetInnerHTML={{ __html: journey.description }} />
          </div>
        </>
      )}
    </Layout>
  );
}
