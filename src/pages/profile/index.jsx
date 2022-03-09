import Image from "next/image";
import Layout from "../../components/Layout";
import { GridJourney } from "../../components/ui";

export default function Profile() {
  return (
    <Layout title="Profile">
      <h1 className="text-5xl dark:text-white font-avenir font-black my-8">
        Profile
      </h1>
      <div className="flex justify-center">
        <div className="space-y-4 text-center">
          <Image
            src="/img/avatar.jpg"
            width={200}
            height={200}
            objectFit="cover"
            alt="avatar"
            className="rounded-full"
          />
          <h4 className="text-xl dark:text-white font-black font-avenir">
            Lu Sapa Njir
          </h4>
          <span className="text-xl text-gray-400 font-avenir">
            example@mail.com
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-6">
        <GridJourney />
      </div>
    </Layout>
  );
}
