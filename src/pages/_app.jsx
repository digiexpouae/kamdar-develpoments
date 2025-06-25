import '../styles/globals.css'
import StickyIcon from '../commmon/stickyicon';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <StickyIcon />
    </>
  );
}
