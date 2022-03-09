import Image from "next/image";
import Link from "next/link";

export default function GridJourney() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
    <a
      key={i}
      className="bg-white dark:bg-black hover:ring rounded-md shadow-lg"
    >
      <Image
        src="https://placeimg.com/600/360/nature"
        width={332}
        height={180}
        alt="journey"
        className="w-full h-[180px] object-cover rounded-t-md"
      />
      <div className="p-4 font-product">
        <h4 className="text-lg dark:text-white font-semibold">
          Lorem, ipsum dolor.
        </h4>
        <span className="text-gray-400 text-sm py-2">
          Lorem ipsum dolor sit.
        </span>
        <h6 className="text-sm dark:text-white py-2 text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          maiores voluptate quaerat tempora vitae in facere minus reprehenderit
          labore odio.
        </h6>
      </div>
    </a>
  ));
}
