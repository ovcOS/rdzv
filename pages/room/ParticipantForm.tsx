import { useState } from 'react';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { joinRoom } from '@/lib/api-client/joinRoom';

export const ParticipantForm = ({ room, participantId }: { room: RoomProps; participantId: Id }) => {
  const [name, setName] = useState('');
  const disabled = !name || name.length <= 3;
  return (
    <Card>
      <CardContent>
        <TextField id="name-input" label="Name" variant="standard" onChange={(v) => setName(v.target.value)} />
        <Typography variant="body2" gutterBottom style={{ marginTop: '10px' }}>
          Location: Zürich, Switzerland (detected)
        </Typography>
        <Button
          size="medium"
          disabled={disabled}
          onClick={async () => {
            const participant = { id: participantId, name, location: { lat: 1.234, lng: 2.345 } };
            await joinRoom({ slug: room.slug, participant });
            window.location.reload();
          }}
        >
          Take part
        </Button>
      </CardContent>
    </Card>
  );
};
