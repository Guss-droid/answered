import Head from "next/head";
import { LoginComp } from "../components/LoginComp";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | Answered</title>
      </Head>

      <LoginComp />
    </>
  )
}