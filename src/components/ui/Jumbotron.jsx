export default function Jumbotron() {
  return (
    <div className="relative h-[510px]">
      <img // eslint-disable-line
        src="/img/phuket.png"
        alt="hero"
        className="absolute top-0 left-0 w-full md:w-auto h-[510px] object-cover brightness-75 dark:brightness-50"
      />
      <div className="absolute top-44 w-full md:w-auto text-center md:text-left md:left-24 text-white font-avenir space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold shadow-sm">
          The Journey
          <br />
          you ever dreamed of.
        </h1>
        <h3 className="text-md md:text-xl opacity-90 shadow-sm">
          We made a tool so you can easily keep & share your travel memories.{" "}
          <br />
          But there is a lot more
        </h3>
      </div>
    </div>
  );
}
