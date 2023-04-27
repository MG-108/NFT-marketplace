import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

import { Navbar, Footer } from '../../components';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider attribute="class">
    <div className="min-h-screen bg-white dark:bg-nft-dark">
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>

    <Script
      src="https://kit.fontawesome.com/7c508d22a3.js"
      crossOrigin="anonymous"
    />
  </ThemeProvider>
);

export default MyApp;
