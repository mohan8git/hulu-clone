import Head from "next/head";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Results from "../components/Results";
import requests from "../utils/requests";

export default function Home({ results }) {
  return (
    <div>
      <Head>
        <title>Hulu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Navbar />
      <Results results={results} />
    </div>
  );
}

//this part get rendered  on the server. this happends first
export async function getServerSideProps(context) {
  const genre = context.query.genre;
  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  )
    .then((res) => {
      // console.log("res", res.json());
      return res.json();
    })
    .catch((err) => {
      console.log("err", err);
    });

  return {
    props: {
      results: request.results,
    },
  };
}
