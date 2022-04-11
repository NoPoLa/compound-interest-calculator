import Calculator from "components/calculator";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Compound Interest Calculator</title>
        <meta name="description" content="A Compound Interest Calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="mx-auto mt-24 max-w-6xl ">
          <h1 className="text-center text-2xl ">
            Compound Interest Calculator
          </h1>

          <div>
            <Calculator />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
