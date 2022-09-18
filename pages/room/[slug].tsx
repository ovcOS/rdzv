/* eslint-disable @typescript-eslint/no-unused-vars */
import { loadRoom, loadRooms } from '@/lib/db';
import { GetStaticProps } from 'next';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Container } from '@mui/material';
import { Map } from '@/components';
import { useEffect, useState } from 'react';
import { getParticipantId } from '@/lib/web';
import { HeaderCard, ParticipantForm } from '@/components/room';
import { LoadScript } from '@react-google-maps/api';
import { LIBRARIES, SetState } from '@/components/map/lib';

export const getStaticProps: GetStaticProps = async (context) => {
  const roomSlug = context.params?.slug as string;
  const { _id, ...room } = (await loadRoom(roomSlug)) || {};
  return {
    props: {
      room,
    },
  };
};

export async function getStaticPaths() {
  const rooms = await loadRooms();
  const paths = rooms.map((room) => ({
    params: { slug: room.slug },
  }));
  return { paths, fallback: true };
}

const MapCard = ({
  room,
  participantOrigin,
  newMeetingLocation,
  setNewMeetingLocation,
}: {
  room: RoomProps;
  participantOrigin: LocationProps | null;
  newMeetingLocation: LocationProps | undefined;
  setNewMeetingLocation: SetState<LocationProps | undefined>;
}) => {
  const { participants, meetingLocation } = room;
  const existingOrigins = participants.map((v) => v.location);
  return (
    <Card>
      <CardContent>
        <Map
          existingOrigins={existingOrigins}
          participantOrigin={participantOrigin}
          existingMeetingLocation={meetingLocation}
          newMeetingLocation={newMeetingLocation}
          setNewMeetingLocation={setNewMeetingLocation}
        />
      </CardContent>
    </Card>
  );
};

const Room = ({ room }: { room: RoomProps }) => {
  const [participantId, setParticipantId] = useState('');
  const [participantOrigin, setSelectedOrigin] = useState(null as LocationProps | null);
  const [newMeetingLocation, setNewMeetingLocation] = useState(undefined as LocationProps | undefined);

  useEffect(() => {
    setParticipantId(getParticipantId());
  }, []);

  if (!room) return null;

  const hasParticipant = room.participants.find((v) => v.id === participantId);

  return (
    <LoadScript libraries={LIBRARIES} googleMapsApiKey="AIzaSyDEq9i1TN3va9qFrydwl-0TfbpLmhb_FxQ">
      <Container maxWidth="md" style={{ marginBottom: '20px' }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <HeaderCard room={room} participantId={participantId} />
          </Grid>
        </Grid>
        {!hasParticipant && (
          <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <ParticipantForm
                room={room}
                participantId={participantId}
                origin={participantOrigin}
                newMeetingLocation={newMeetingLocation}
                setSelectedOrigin={setSelectedOrigin}
              />
            </Grid>
          </Grid>
        )}
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <MapCard
              room={room}
              participantOrigin={participantOrigin}
              newMeetingLocation={newMeetingLocation}
              setNewMeetingLocation={setNewMeetingLocation}
            />
          </Grid>
        </Grid>
      </Container>
    </LoadScript>
  );
};

export default Room;
