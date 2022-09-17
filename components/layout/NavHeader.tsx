import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import ShareIcon from '@mui/icons-material/Share';
import Link from 'next/link';
import { Button } from '@mui/material';
import { useState } from 'react';
import { Notification } from '../helpers';

export default function NavHeader() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Link href="/">
              <HomeIcon color="inherit" aria-label="home" sx={{ mr: 2 }} style={{ margin: '15px' }} />
            </Link>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Randezvous
          </Typography>
          <Button
            color="inherit"
            onClick={async () => {
              navigator.clipboard.writeText(window.location.href);
              setOpen(true);
            }}
          >
            <ShareIcon color="inherit" aria-label="share" sx={{ mr: 2 }} style={{ margin: '15px' }} />
          </Button>
          <Notification open={open} handleClose={handleClose} message={'Link copied to clipboard 🥳'} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
