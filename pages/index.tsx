import Head from 'next/head'
import Main from '../src/main/Main'
import { AppName } from '../src/constants/constants'
import styled from 'styled-components'

const HomeContainer = styled.div`
  min-height: 170px;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  overflow: auto;
`

export default function Home() {
  return (
    <HomeContainer>
      <Head>
        <title>{AppName}</title>
        <meta name="description" content="Game of catch words" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main/>
    </HomeContainer>
  )
}
