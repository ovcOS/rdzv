import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { ExistingRoomSettings, NewRoomSettings } from '@/components';
import { ChooseStatus } from '@/components';
import Image from 'next/image';

const Home: NextPage = () => {
  const [status, setStatus] = useState<HomePageStatus>('home');

  const isHome = status === 'home';
  const isNewRoom = status === 'newRoom';
  const isExistingRoom = status === 'existingRoom';

  return (
    <>
      <h1 className={styles.title}>
        welcome to <code>rdzv</code> 🤓
      </h1>
      <Image height="200" width="590" src="/assets/images/dino_running.gif" alt="lets meet" />
      <Grid container xs={12} sm={6} lg={4} style={{ marginTop: '20px' }}>
        {isHome && <ChooseStatus setStatus={setStatus} />}
        {isNewRoom && <NewRoomSettings goBack={() => setStatus('home')} />}
        {isExistingRoom && <ExistingRoomSettings goBack={() => setStatus('home')} />}
      </Grid>
    </>
  );
};

export default Home;
