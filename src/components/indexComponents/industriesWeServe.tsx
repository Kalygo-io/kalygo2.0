import { useTranslation } from "next-i18next";
import Image from "next/image";

export default function IndustriesWeServe() {
  const { t } = useTranslation();

  const profiles = [
    {
      title: t("common:industries-we-serve.persona-1"),
      subtitle: t("common:industries-we-serve.persona-1-subtitle"),
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
    {
      title: t("common:industries-we-serve.persona-2"),
      subtitle: t("common:industries-we-serve.persona-2-subtitle"),
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
      title: t("common:industries-we-serve.persona-3"),
      subtitle: t("common:industries-we-serve.persona-3-subtitle"),
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
  ];

  return (
    <div className="bg-blue-600 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center">
            {t("common:industries-we-serve.title")}
          </h2>
          <p className="mt-6 text-lg leading-8 text-white text-center">
            {t("common:industries-we-serve.description-1")}{" "}
            <b>{t("common:industries-we-serve.description-2")}</b>{" "}
            {t("common:industries-we-serve.description-3")}
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
