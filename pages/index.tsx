import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { ExistingRoomSettings, NewRoomSettings } from '@/components';
import { ChooseStatus } from '@/components';

const Home: NextPage = () => {
  const [status, setStatus] = useState<Status | undefined>(undefined);

  const isStatusKnown = !!status;
  const isNewRoom = status === 'new';
  const isExistingRoom = status === 'existing';

  return (
    <>
      <h1 className={styles.title}>
        welcome to <code>rdzv</code> 🤓
      </h1>
      <Grid container xs={4} style={{ marginTop: '20px' }}>
        {!isStatusKnown && <ChooseStatus setStatus={setStatus} />}
        {isNewRoom && <NewRoomSettings />}
        {isExistingRoom && <ExistingRoomSettings />}
      </Grid>
    </>
  );
};

export default Home;
