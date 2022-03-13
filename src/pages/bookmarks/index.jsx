import { useContext, useEffect, useState } from "react";
import { API } from "../../utils/api";
import { UserContext } from "../../context/UserContext";
import Layout from "../../components/Layout";
import { GridJourney, PostSkeleton } from "../../components/ui";

export default function Bookmark() {
  const { state } = useContext(UserContext);
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(false);
  // get bookmarked journey
  const getJourneys = async () => {
    setLoading(true);
    const res = await API.get(`/bookmarks/${state.user.id}`);
    setJourneys(res.data);
    setLoading(false);
  };
  useEffect(() => {
    getJourneys();
  }, []);
  return (
    <Layout title="Bookmarks">
      <h1 className="text-5xl dark:text-white font-avenir font-black my-8">
        Bookmarks
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-6">
        {journeys.length > 0 ? (
          journeys.map((journey) => (
            <GridJourney journey={journey} key={journey.id} />
          ))
        ) : (
          <>
            <PostSkeleton />
          </>
        )}
      </div>
    </Layout>
  );
}
