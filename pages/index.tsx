// pages/index.tsx
import Head from "next/head";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Welcome | Candidate Simulator Ai</title>
        <meta name="description" content="Homepage for Candidate Simulator Ai" />
      </Head>
      <main className="min-h-screen flex flex-col justify-center items-center bg-yellow-400">
        <h1 className="text-4xl font-bold text-center">
          Welcome to Candidate Simulator Ai
        </h1>
      </main>
    </>
  );
};

export default Home;
