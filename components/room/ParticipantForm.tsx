import { useState } from 'react';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { Autocomplete } from '@react-google-maps/api';

import {
  AutocompleteProps,
  onAutocompleteLoad,
  onAutocompletePlaceChanged,
  setCurrentLocationAsOrigin,
  SetState,
} from '@/components/map/lib';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { updateRoom } from '@/lib/api-client';

export const ParticipantForm = ({
  room,
  participantId,
  origin,
  newMeetingLocation,
  setSelectedOrigin,
}: {
  room: RoomProps;
  participantId: Id;
  origin: LocationProps | null;
  newMeetingLocation: LocationProps | undefined;
  setSelectedOrigin: SetState<LocationProps | null>;
}) => {
  const [name, setName] = useState('');
  const [autocomplete, setAutocomplete] = useState(null as AutocompleteProps | null);
  const disabled = !name || name.length <= 3 || !origin || !newMeetingLocation;
  return (
    <Card style={{ marginTop: '10px' }}>
      <CardContent>
        <>
          <Typography gutterBottom variant="h6" component="div" style={{ marginBottom: '10px' }}>
            Where are you coming from?
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button variant="outlined" onClick={() => setCurrentLocationAsOrigin(setSelectedOrigin)}>
                Current location
              </Button>
              <span style={{ marginLeft: '20px', marginRight: '20px' }}>or</span>
              <Autocomplete
                onLoad={(instance) => onAutocompleteLoad(instance, setAutocomplete)}
                onPlaceChanged={() => onAutocompletePlaceChanged(autocomplete, setSelectedOrigin)}
              >
                <TextField id="location-input" variant="standard" />
              </Autocomplete>
            </div>
            {!!origin && (
              <Typography variant="body2" gutterBottom style={{ marginRight: '10px' }}>
                <LocationOnIcon /> {origin.lat} {origin.lng} (detected)
              </Typography>
            )}
          </div>
          <Typography gutterBottom variant="h6" component="div" style={{ marginTop: '15px', marginBottom: '-5px' }}>
            What’s your name?
          </Typography>
          <TextField
            id="name-input"
            placeholder="Type it here..."
            variant="standard"
            style={{ marginTop: '10px' }}
            onChange={(v) => setName(v.target.value)}
          />
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
            <Button
              size="large"
              variant="contained"
              disabled={disabled}
              onClick={async () => {
                if (!origin || !newMeetingLocation) return;
                const participant = { id: participantId, name, location: origin };
                await updateRoom({ slug: room.slug, participant, meetingLocation: newMeetingLocation });
                window.location.reload();
              }}
            >
              Take part
            </Button>
          </div>
        </>
      </CardContent>
    </Card>
  );
};
