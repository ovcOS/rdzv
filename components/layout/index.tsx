import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { Theme } from './theme';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Theme>
      <div className={styles.container}>
        <Head>
          <title>Home</title>
          <meta name="description" content="Meet at the most convenient place" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Head>
        <main className={styles.main}>{children}</main>
      </div>
    </Theme>
  </>
);

export default Layout;
