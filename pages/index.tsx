import Head from 'next/head'
import Main from '../src/main/Main'
import styles from '../styles/Home.module.css'
import { AppName } from '../src/constants/constants'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{AppName}</title>
        <meta name="description" content="Game of catch words" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main/>
    </div>
  )
}
