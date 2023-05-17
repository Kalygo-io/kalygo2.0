import Link from "next/link";
import { AiOutlineCheck } from "react-icons/ai";
import { useRouter } from "next/router";
import Head from "next/head";

export default function VerifyEmail() {
  const router = useRouter();

  const {
    query: { token },
  } = router;

  return (
    <>
      <Head>
        <title>Kalygo Email Verification</title>
        <meta
          name="description"
          content="This is the confirmation page after successfully verifying your email."
        />
      </Head>

      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          {/* <Image></Image> */}
          <div className="flex items-center justify-center">
            <AiOutlineCheck color="green" />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            You&apos;re verified!
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            We&apos;ll be in touch
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Back to home
            </Link>
            {/* <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a> */}
          </div>
        </div>
      </main>
    </>
  );
}
