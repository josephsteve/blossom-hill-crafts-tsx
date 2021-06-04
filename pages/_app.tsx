import '@/styles/globals.css';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import type { AppProps } from 'next/app';
import AppWrapper from './AppWrapper';

function MyApp({ Component, pageProps }: AppProps) {
  return <AppWrapper><Component {...pageProps} /></AppWrapper>;
}
export default MyApp
