import Image from "next/image";
import Layout from "../components/Layout";

export default function Journey() {
  return (
    <Layout title="Journey">
      <div className="flex justify-between items-center">
        <div className="space-y-4 my-8">
          <h1 className="text-4xl dark:text-gray-200 font-avenir font-black">
            Lorem ipsum dolor sit amet.
          </h1>
          <span className="text-lg text-bleude font-product">
            17 October 2021
          </span>
        </div>
        <h6 className="text-lg dark:text-gray-200 font-avenir">
          Sebut saja mawar
        </h6>
      </div>
      <Image
        src="https://placeimg.com/1000/548/nature"
        width={1920}
        height={1080}
        objectFit="cover"
        alt="thumbnail"
        className="rounded-lg"
      />
      <div className="dark:text-gray-200 text-justify my-12">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit vero
          ducimus, minus pariatur delectus nam exercitationem non reprehenderit
          asperiores fugiat minima, nulla eos. Illo repellendus similique nemo
          facere animi aspernatur ullam odit doloribus, iusto expedita pariatur
          deserunt consequatur et facilis fugit fugiat mollitia eaque hic dolor
          maxime accusamus? Ullam deleniti eveniet nulla porro quos odit quae
          iusto voluptatem temporibus hic dolorum consequuntur, ab omnis
          delectus est adipisci iste dignissimos velit voluptate fugiat? Numquam
          officiis repellat ea ab nihil quasi dolorum deleniti, quibusdam
          quaerat! Voluptates sunt at veniam excepturi, in dolor ullam ad
          necessitatibus delectus libero doloribus nam quae recusandae tempore.
        </p>
      </div>
    </Layout>
  );
}
