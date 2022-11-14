import Head from 'next/head'
import { HeaderLandingPage } from '../components/Header'
import { LandingPage } from '../components/LandingPage'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Answered</title>
      </Head>
      
      <HeaderLandingPage />
      <LandingPage />
    </>
  )
}