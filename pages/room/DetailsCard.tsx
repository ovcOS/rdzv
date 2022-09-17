import { Card, CardContent, Typography } from '@mui/material';

export const DetailsCard = ({ room, participantId }: { room: RoomProps; participantId: Id }) => (
  <Card style={{ marginTop: '150px' }}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Room: {room.name}
      </Typography>
      Participants
      {room.participants.map((v, index) => {
        const isParticipant = v.id === participantId;
        return (
          <Typography key={index} variant="body2" color="text.secondary">
            {v.name} - {JSON.stringify(v.location)} {isParticipant ? '<-' : ''}
          </Typography>
        );
      })}
    </CardContent>
  </Card>
);
