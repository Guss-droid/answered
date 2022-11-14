import Head from "next/head";
import { Header } from "../components/Header";
import { HomeComp } from "../components/Home";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home | Answered</title>
      </Head>

      <Header />
      <HomeComp />
    </>
  )
}