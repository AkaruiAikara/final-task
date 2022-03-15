import { useState } from "react";
import Lottie from "lottie-react";
import noData from "../assets/json/no-data-found.json";
import { API } from "../utils/api";
import Layout from "../components/Layout";
import { Jumbotron, GridJourney } from "../components/ui";

export default function Home({ data }) {
  const [journeys, setJourneys] = useState(data);
  const [inputSearch, setInputSearch] = useState("");
  // handle search change
  const handleSearchChange = (e) => {
    setInputSearch(e.target.value);
    const search = e.target.value;
    if (search === "") {
      setJourneys(data);
    } else {
      const filteredJourneys = data.filter((journey) => {
        return journey.title.toLowerCase().includes(search.toLowerCase());
      });
      setJourneys(filteredJourneys);
    }
  };
  // handle search click
  const handleSearchClick = () => {
    API.get(`/journeys/search/${inputSearch.toLowerCase()}`).then((res) => {
      setJourneys(res.data);
    });
  };
  return (
    <Layout title="Home">
      <Jumbotron />
      <div className="container">
        <h1 className="text-5xl dark:text-white font-black font-avenir my-12">
          Journey
        </h1>
        <div className="relative flex justify-center items-center md:mx-24 my-8">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Find Journey"
            value={inputSearch}
            onChange={handleSearchChange}
            className="px-4 py-3 w-full dark:bg-black dark:text-white dark:placeholder:text-gray-400 focus:outline-bleude"
          />
          <button
            onClick={() => handleSearchClick()}
            className="p-3 bg-bleude hover:bg-sky-700 active:bg-sky-900 text-white font-product"
          >
            Search
          </button>
        </div>
        {journeys.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-6">
            {journeys.map((journey) => (
              <GridJourney journey={journey} key={journey.id} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center pb-6">
            <Lottie animationData={noData} loop autoplay className="h-80" />
            <h1 className="mx-auto text-4xl text-red-700 dark:text-red-300">
              No data found!
            </h1>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await API.get("/journeys");
  return {
    props: {
      data: res.data,
    },
  };
}
