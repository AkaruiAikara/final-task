import Image from "next/image";
import Layout from "../../components/Layout";
import { GridJourney } from "../../components/ui";

export default function Profile() {
  return (
    <Layout title="Bookmarks">
      <h1 className="text-5xl dark:text-white font-avenir font-black my-8">
        Bookmarks
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-6">
        <GridJourney />
      </div>
    </Layout>
  );
}
