import '@/styles/globals.css';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
