import Head from "next/head";

const Home: React.FC = () => (
  <>
    <Head>
      <title>Welcome | Candidate Simulator Ai</title>
      <meta
        name="description"
        content="Homepage for Candidate Simulator Ai"
      />
    </Head>
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#FED000", // LPTX Gold
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "700",
          marginBottom: "1rem",
          color: "#56565A", // Charcoal Gray
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        Welcome to Candidate Simulator Ai
      </h1>

      <p
        style={{
          fontSize: "1.25rem",
          maxWidth: "600px",
          lineHeight: "1.6",
          color: "#000000", // Black
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        To begin your conversation with Linda, a concerned mother and single
        parent, please use the <strong>“Next” button</strong> provided on our
        main campaign website.
      </p>

      <p
        style={{
          marginTop: "2rem",
          fontSize: "1rem",
          color: "#56565A",
          fontStyle: "italic",
        }}
      >
        This simulator is part of the official LPTX Candidate Experience.
      </p>
    </main>
  </>
);

export default Home;
