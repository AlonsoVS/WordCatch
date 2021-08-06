import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';
import { AppThemeDark } from '../styles/AppTheme';
import { createContext, useState } from 'react';

export type PlayGameProps = {
  connection?:Function
  addConnection?:Function
}

export const PlayGameContext = createContext<PlayGameProps>({});

function App({ Component, pageProps }: AppProps) {
  const [playProps, setPlayProps] = useState<PlayGameProps>({});

  const addConnection = (connection:Function) => {
    setPlayProps(() => ({ ...playProps, connection }));
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
