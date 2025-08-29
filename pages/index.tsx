import Head from "next/head";

const Home: React.FC = () => (
  <>
    <Head>
      <title>Welcome | Candidate Simulator</title>
      <meta name="description" content="Homepage for Candidate Simulator" />
    </Head>
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#f2f2f2"
    }}>
      <h1>Welcome to Candidate Simulator</h1>
      <p>
        This is a generic homepage. Click below to get started or use your site navigation.
      </p>
      <a href="/linda">
        <button style={{
          marginTop: "24px",
          padding: "12px 32px",
          border: "none",
          borderRadius: "8px",
          background: "#0070f3",
          color: "#fff",
          fontSize: "1rem",
          cursor: "pointer"
        }}>
          Get Started
        </button>
      </a>
    </main>
  </>
);

export default Home;
