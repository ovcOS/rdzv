import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import { Button, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import {
  autoCompleteStyle,
  containerStyle,
  DirectionsResult,
  LIBRARIES,
  mapOriginsToFinalDestination,
  onAutocompleteLoad,
  setCurrentLocationAsOrigin,
  setInitialMapCenter,
  ZOOM,
  onAutocompletePlaceChanged,
  AutocompleteProps,
  DEFAULT_POSITION,
  directionsServiceCallback,
  mapStyles,
} from './lib';

export const Map = React.memo(
  ({
    existingOrigins = [],
    existingMeetingLocation,
  }: {
    existingMeetingLocation?: LocationProps;
    existingOrigins?: LocationProps[];
  }) => {
    const [center, setCenter] = useState(DEFAULT_POSITION);
    const [origin, setSelectedOrigin] = useState(null as LocationProps | null);
    const [autocomplete, setAutocomplete] = useState(null as AutocompleteProps | null);
    // for now only using transit as travel mode
    const [travelMode, setTravelMode] = useState('TRANSIT' as TravelMode);
    const [directionsResult, setDirectionsResult] = useState([] as DirectionsResult[]);

    useEffect(() => {
      setInitialMapCenter(setCenter, existingMeetingLocation);
    }, [existingMeetingLocation]);

    // if the first origin is set by the current user, display a message telling them
    // a route will be defined once more people define their origin

    const originsToFinalDestination = useMemo(
      () => mapOriginsToFinalDestination(existingOrigins, origin),
      [existingOrigins, origin]
    );

    return (
      <LoadScript libraries={LIBRARIES} googleMapsApiKey="AIzaSyDEq9i1TN3va9qFrydwl-0TfbpLmhb_FxQ">
        {existingMeetingLocation && (
          <>
            <h4>So far, the most optimal meeting point for your group is {existingMeetingLocation.lat}</h4>
          </>
        )}
        <Typography gutterBottom variant="h5" component="div">
          Where are you coming from?
        </Typography>
        <Button color="primary" onClick={() => setCurrentLocationAsOrigin(setSelectedOrigin)}>
          Current location
        </Button>
        or
        <Autocomplete
          onLoad={(instance) => onAutocompleteLoad(instance, setAutocomplete)}
          onPlaceChanged={() => onAutocompletePlaceChanged(autocomplete, setSelectedOrigin)}
        >
          <TextField placeholder="Type a location" style={{ marginTop: '20px', marginBottom: '30px' }} />
        </Autocomplete>
        <GoogleMap
          options={{ styles: mapStyles }}
          clickableIcons
          mapContainerStyle={containerStyle}
          center={center}
          zoom={ZOOM}
        >
          {!!(origin && !directionsResult.length) &&
            originsToFinalDestination.map(({ origin, destination }, i) => (
              <DirectionsService
                key={`${origin.lat}-${i}`}
                options={{ destination, origin, travelMode }}
                callback={directionsServiceCallback(setDirectionsResult)}
              />
            ))}
          {!!directionsResult.length &&
            directionsResult.map((directions, i) => (
              <DirectionsRenderer key={`directions-renderer-${i}`} options={{ directions }} />
            ))}
        </GoogleMap>
      </LoadScript>
    );
  }
);
