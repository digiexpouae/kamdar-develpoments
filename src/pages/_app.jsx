import '../styles/globals.css'
import StickyIcon from '../common/stickyicon/stickyicon';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <StickyIcon />
    </>
  );
}
