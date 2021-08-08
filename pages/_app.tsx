import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';
import { AppThemeDark } from '../styles/AppTheme';
import { createContext, useEffect, useState } from 'react';

export type PlayGameProps = {
  connection?:Function
  creatorOfRoom?:boolean
  addConnection?:(connection:Function, creatorOfRoom:boolean)=>void
}

export const PlayGameContext = createContext<PlayGameProps>({});

function App({ Component, pageProps }: AppProps) {
  const [playProps, setPlayProps] = useState<PlayGameProps>({});

  const addConnection = (connection:Function, creatorOfRoom:boolean) => {
    setPlayProps(() => ({ ...playProps, connection, creatorOfRoom }));
  }

  return (
    <PlayGameContext.Provider 
      value={ { ...playProps, addConnection } }>
      <ThemeProvider theme={AppThemeDark}>
        <Component {...pageProps} />
      </ThemeProvider>
    </PlayGameContext.Provider>
  )
}
export default App;
