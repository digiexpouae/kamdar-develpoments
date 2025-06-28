import '../styles/globals.css'
import StickyIcon from '../common/stickyicon/stickyicon';
import RootLayout from '../components/RootLayout';


const App =({ Component, pageProps }) => {
  return (
    <RootLayout>
      
      <Component {...pageProps} />
      <StickyIcon />

    </RootLayout>
  );
}

export default App
