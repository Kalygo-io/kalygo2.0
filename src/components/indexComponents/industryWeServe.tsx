import { useTranslation } from "next-i18next";
import Image from "next/image";

interface P {
  industry: "medical" | "law" | "highered";
}

export default function IndustryWeServe(p: P) {
  const { industry } = p;
  const { t } = useTranslation();

  let profiles: {
    title: string;
    subtitle: string;
    image: React.ReactElement;
  }[] = [];

  let subtitle: React.ReactElement | null = null;

  switch (industry) {
    case "medical":
      profiles = [
        {
          title: t("common:industries-we-serve.medical.persona-1"),
          subtitle: t("common:industries-we-serve.medical.persona-1-subtitle"),
          image: (
            <Image
              src="/Medical_Researchers.gif"
              width={500}
              height={500}
              alt=""
              className="object-fit rounded-2xl object-center opacity-100 group-hover:opacity-50 mx-auto"
            />
          ),
        },
        {
          title: t("common:industries-we-serve.medical.persona-2"),
          subtitle: t("common:industries-we-serve.medical.persona-2-subtitle"),
          image: (
            <Image
              src="/Practice_Managers.gif"
              width={500}
              height={500}
              alt=""
              className="object-fit rounded-2xl object-center opacity-100 group-hover:opacity-50 mx-auto"
            />
          ),
        },
        {
          title: t("common:industries-we-serve.medical.persona-3"),
          subtitle: t("common:industries-we-serve.medical.persona-3-subtitle"),
          image: (
            <Image
              src="/Medical_Sales.gif"
              width={500}
              height={500}
              alt=""
              className="object-fit rounded-2xl object-center opacity-100 group-hover:opacity-50 mx-auto"
            />
          ),
        },
      ];
      subtitle = (
        <p className="mt-6 text-lg leading-8 text-white text-center">
          {t("common:industries-we-serve.medical.description-1")}{" "}
          <b>{t("common:industries-we-serve.medical.description-2")}</b>{" "}
          {t("common:industries-we-serve.medical.description-3")}
        </p>
      );
      break;
    case "highered":
      profiles = [
        {
          title: t("common:industries-we-serve.highered.persona-1"),
          subtitle: t("common:industries-we-serve.highered.persona-1-subtitle"),
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
          title: t("common:industries-we-serve.highered.persona-2"),
          subtitle: t("common:industries-we-serve.highered.persona-2-subtitle"),
          image: (
            <Image
              src="/College_Students.gif"
              width={500}
              height={500}
              alt=""
              className="object-fit rounded-2xl object-center opacity-100 group-hover:opacity-50 mx-auto"
            />
          ),
        },
        {
          title: t("common:industries-we-serve.highered.persona-3"),
          subtitle: t("common:industries-we-serve.highered.persona-3-subtitle"),
          image: (
            <Image
              src="/Professor.gif"
              width={500}
              height={500}
              alt=""
              className="object-fit rounded-2xl object-center opacity-100 group-hover:opacity-50 mx-auto"
            />
          ),
        },
      ];
      subtitle = (
        <p className="mt-6 text-lg leading-8 text-white text-center">
          {t("common:industries-we-serve.highered.description-1")}{" "}
          <b>{t("common:industries-we-serve.highered.description-2")}</b>{" "}
          {t("common:industries-we-serve.highered.description-3")}
        </p>
      );
      break;
    case "law":
      profiles = [
        {
          title: t("common:industries-we-serve.law.persona-1"),
          subtitle: t("common:industries-we-serve.law.persona-1-subtitle"),
          image: (
            <Image
              src="/Law_Firm.gif"
              width={500}
              height={500}
              alt=""
              className="object-fit rounded-2xl object-center opacity-100 group-hover:opacity-50 mx-auto"
            />
          ),
        },
        {
          title: t("common:industries-we-serve.law.persona-2"),
          subtitle: t("common:industries-we-serve.law.persona-2-subtitle"),
          image: (
            <Image
              src="/Contract_Lawyer.gif"
              width={500}
              height={500}
              alt=""
              className="object-fit rounded-2xl object-center opacity-100 group-hover:opacity-50 mx-auto"
            />
          ),
        },
        {
          title: t("common:industries-we-serve.law.persona-3"),
          subtitle: t("common:industries-we-serve.law.persona-3-subtitle"),
          image: (
            <Image
              src="/Courts.gif"
              width={500}
              height={500}
              alt=""
              className="object-fit rounded-2xl object-center opacity-100 group-hover:opacity-50 mx-auto"
            />
          ),
        },
      ];
      subtitle = (
        <p className="mt-6 text-lg leading-8 text-white text-center">
          {t("common:industries-we-serve.law.description-1")}{" "}
          <b>{t("common:industries-we-serve.law.description-2")}</b>{" "}
          {t("common:industries-we-serve.law.description-3")}
        </p>
      );
      break;
  }

  return (
    <div className="bg-blue-600 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center">
            {t("common:industries-we-serve.title")}
          </h2>
          {subtitle}
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
