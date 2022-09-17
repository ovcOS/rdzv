import Head from 'next/head';
import styles from '@/styles/Home.module.css';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Meet at the most convenient place" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <main className={styles.main}>{children}</main>
    </div>
  </>
);

export default Layout;
