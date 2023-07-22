import Image from "next/image";

const profiles = [
  {
    title: "Law firms",
    subtitle:
      "Kalygo's collaboration features help your team reliably increase productivity",
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
    title: "Paralegals",
    subtitle:
      "Quickly generate customized briefs for the leaders of your organization",
    image: (
      <Image
        src="/Paralegal.gif"
        width={500}
        height={500}
        alt=""
        className="object-fit rounded-2xl object-center opacity-100 group-hover:opacity-50 mx-auto"
      />
    ),
  },
  {
    title: "Counsel",
    subtitle:
      "Discovery can be overwhelming and Kalygo is here to shorten time to insight so you focus on what matters",
    image: (
      <Image
        src="/Research.gif"
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
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Industry We Serve
          </h2>
          <p className="mt-6 text-lg leading-8 text-white">
            We take pride in serving the legal industry
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
