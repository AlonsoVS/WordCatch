import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';
import { AppThemeDark } from '../styles/AppTheme';

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={AppThemeDark}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default App;
