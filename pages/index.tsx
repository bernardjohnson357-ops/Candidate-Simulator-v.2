import Head from "next/head";

const Home: React.FC = () => (
  <>
    <Head>
      <title>Welcome | Candidate Simulator Ai</title>
      <meta name="description" content="Homepage for Candidate Simulator Ai" />
    </Head>
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#FED000"
    }}>
      <h1>Welcome to Candidate Simulator Ai</h1>
      <p>
        Click either "next" button to begin your conversation with Linda, a concered mother and single parent.
      </p>
      <a href="/linda">
        <button style={{
          marginTop: "24px",
          padding: "12px 32px",
          border: "none",
          borderRadius: "8px",
          background: "#ffe44d",
          color: "#000",
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
