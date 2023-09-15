import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Noto_Sans_KR } from 'next/font/google';

const notoSansKr = Noto_Sans_KR({ subsets: ['latin'], weight: ['100', '400', '700', '900'] });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={notoSansKr.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default App;
