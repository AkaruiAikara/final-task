import Skeleton from "react-loading-skeleton";

export default function PostSkeleton() {
  return ["1", "2", "3", "4"].map((i) => (
    <div
      key={i}
      className="border-2 border-white rounded-sm space-x-2 w-full p-2"
    >
      <Skeleton
        width="full"
        height={120}
        highlightColor="#808080"
        className="bg-antiflash dark:bg-smokyblack"
      />
      <Skeleton
        width={100}
        height={18}
        highlightColor="#808080"
        className="bg-antiflash dark:bg-smokyblack"
      />
      <Skeleton
        width={60}
        height={18}
        highlightColor="#808080"
        className="bg-antiflash dark:bg-smokyblack"
      />
      <Skeleton
        width={260}
        height={18}
        highlightColor="#808080"
        className="bg-antiflash dark:bg-smokyblack"
      />
      <Skeleton
        width={260}
        height={18}
        highlightColor="#808080"
        className="bg-antiflash dark:bg-smokyblack"
      />
      <Skeleton
        width="50%"
        height={18}
        highlightColor="#808080"
        className="bg-antiflash dark:bg-smokyblack"
      />
    </div>
  ));
}
