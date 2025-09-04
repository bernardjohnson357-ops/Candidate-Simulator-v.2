import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";

const Module1: NextPage = () => {
  return (
    <>
      <Head>
        <title>Module 1: Filing Process | Candidate Simulator AI</title>
        <meta
          name="description"
          content="Candidate Simulator - Module 1: Filing Process"
        />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          Module 1: Filing Process
        </h1>

        <div className="bg-white rounded-2xl shadow p-6 max-w-2xl text-lg leading-relaxed">
          <p className="mb-4">
            In this module, you’ll begin your journey by learning about ballot
            access and the filing process for independent and third-party
            candidates. You will:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Choose a campaign path (Independent/Write-In or Libertarian Party).</li>
            <li>Read official state and FEC guides.</li>
            <li>Complete quizzes testing your understanding of compliance.</li>
          </ul>
          <p>
            Earning <span className="font-semibold">Candidate Coins</span> will
            depend on quiz scores and successful completion of filing steps.
          </p>
        </div>

        <div className="mt-8 flex space-x-4">
          <Link href="/" legacyBehavior>
            <a className="px-6 py-3 bg-yellow-400 text-black rounded-xl font-medium shadow hover:bg-yellow-300">
              ← Back to Home
            </a>
          </Link>
          <Link href="/module2" legacyBehavior>
            <a className="px-6 py-3 bg-green-500 text-white rounded-xl font-medium shadow hover:bg-green-600">
              Continue to Module 2 →
            </a>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Module1;
