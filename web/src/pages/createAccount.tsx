import Head from "next/head";
import { CreateAccountComp } from "../components/CreateAccountComp";

export default function CreateAccountPage() {
  return (
    <>
      <Head>
        <title>Login | Answered</title>
      </Head>

      <CreateAccountComp />
    </>
  )
}