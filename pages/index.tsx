import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { createRoom } from '@/lib/api-client';

type Status = 'new' | 'existing';

const ChooseStatus = ({ setStatus }: { setStatus: (arg: Status) => void }) => (
  <>
    <Grid item xs={6} style={{ textAlign: 'center' }}>
      <Button variant="outlined" onClick={() => setStatus('new')}>
        Create new room
      </Button>
    </Grid>
    <Grid item xs={6} style={{ textAlign: 'center' }}>
      <Button variant="outlined" onClick={() => setStatus('existing')}>
        Enter a room
      </Button>
    </Grid>
  </>
);

const NewRoomSettings = () => {
  const roomName = 'testRoomNameXiaoLalala';
  const hasRoomName = !!roomName;
  return (
    <>
      <Button variant="outlined" onClick={async () => await createRoom(roomName)} disabled={!hasRoomName}>
        Continue
      </Button>
    </>
  );
};
const ExistingRoomSettings = () => <div>existing room fields</div>;

const Home: NextPage = () => {
  const [status, setStatus] = useState<Status | undefined>(undefined);

  const isStatusKnown = !!status;
  const isNewRoom = status === 'new';
  const isExistingRoom = status === 'existing';

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Meet at the most convenient place" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          welcome to <code>rdzv</code> 🤓
        </h1>
        <Grid container xs={4} style={{ marginTop: '20px' }}>
          {!isStatusKnown && <ChooseStatus setStatus={setStatus} />}
          {isNewRoom && <NewRoomSettings />}
          {isExistingRoom && <ExistingRoomSettings />}
        </Grid>
      </main>
    </div>
  );
};

export default Home;
