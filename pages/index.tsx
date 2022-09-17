import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import DeleteIcon from '@mui/icons-material/Delete';


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>rdzv</title>
        <meta name="description" content="Meet at the most convenient place" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>

      <main className={styles.main}>
      <h1 className={styles.title}>
        welcome to <code>rdzv</code> 🤓
      </h1>
      <Button variant="contained">Get started</Button>
      <Switch defaultChecked />
      <AccessAlarmIcon />
      <DeleteIcon />
      </main>  
    </div>
  )
}

export default Home
