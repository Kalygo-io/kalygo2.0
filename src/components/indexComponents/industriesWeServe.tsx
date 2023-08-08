import Image from "next/image";

const profiles = [
  {
    title: "Law Firms",
    subtitle: "Lawyers, Paralegals, and Counsel",
    image: (
      <Image
        src="/Law_firm.gif"
        width={500}
        height={500}
        alt=""
        className="object-fit rounded-2xl object-center opacity-100 group-hover:opacity-50 mx-auto"
      />
    ),
  },
  {
    title: "Psychologists",
    subtitle: "Quickly digest notes for your clients with LLM technology",
    image: (
      <Image
        src="/Psychologist.gif"
        width={500}
        height={500}
        alt=""
        className="object-fit rounded-2xl object-center opacity-100 group-hover:opacity-50 mx-auto"
      />
    ),
  },
  {
    title: "Researchers",
    subtitle: "Professors and Students",
    image: (
      <Image
        src="/Researcher.gif"
        width={500}
        height={500}
        alt=""
        className="object-fit rounded-2xl object-center opacity-100 group-hover:opacity-50 mx-auto"
      />
    ),
  },
];

export default function IndustriesWeServe() {
  return (
    <div className="bg-blue-600 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center">
            Industries We Serve
          </h2>
          <p className="mt-6 text-lg leading-8 text-white text-center">
            Any professional that deals with high volumes of document-based data
            will find Kalygo beneficial in{" "}
            <b>managing, digesting and repurposing</b> their data.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-1 lg:max-w-none lg:grid-cols-3"
        >
          {profiles.map((profile) => (
            <li key={profile.title} className="justify-center">
              {profile.image}
              <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white text-center">
                {profile.title}
              </h3>
              <p className="text-base leading-7 text-white text-center">
                {profile.subtitle}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
