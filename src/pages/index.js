import Layout from "../components/layout";
import { Jumbotron, GridJourney } from "../components/ui";

export default function Home() {
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
            className="px-4 py-3 w-full dark:bg-black dark:text-white dark:placeholder:text-gray-400 focus:outline-bleude"
          />
          <button className="p-3 bg-bleude hover:bg-sky-700 active:bg-sky-900 text-white font-product">
            Search
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-6">
          <GridJourney />
        </div>
      </div>
    </Layout>
  );
}
