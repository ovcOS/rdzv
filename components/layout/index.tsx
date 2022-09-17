import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { Theme } from './theme';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

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
        <Link href="/">
          <HomeIcon color="inherit" aria-label="menu" sx={{ mr: 2 }} style={{ margin: '15px' }} />
        </Link>
        <main className={styles.main}>{children}</main>
      </div>
    </Theme>
  </>
);

export default Layout;
