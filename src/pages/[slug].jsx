import { useContext, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { API } from "../utils/api";
import { UserContext } from "../context/UserContext";
import Image from "next/image";
import Layout from "../components/Layout";

export default function Journey({ journey }) {
  const [loading, setLoading] = useState(true);
  return (
    <Layout title="Journey">
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
      {loading && <Skeleton width="full" height={500} />}
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
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await API.get("/journeys");
  const journeys = res.data;
  const paths = journeys.map((journey) => ({
    params: { slug: journey.slug },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await API.get(`/journeys/${params.slug}`);
  const journey = res.data;
  return { props: { journey } };
}
