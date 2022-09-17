import React, { useEffect, useState } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useMemo } from 'react';
import {
  containerStyle,
  DirectionsResult,
  mapOriginsToFinalDestination,
  setInitialMapCenter,
  ZOOM,
  DEFAULT_POSITION,
  directionsServiceCallback,
  mapStyles,
  SetState,
} from './lib';

export const Map = React.memo(
  ({
    participantOrigin,
    existingOrigins = [],
    existingMeetingLocation,
    newMeetingLocation,
    setNewMeetingLocation,
  }: {
    participantOrigin: LocationProps | null;
    existingMeetingLocation?: LocationProps;
    existingOrigins?: LocationProps[];
    newMeetingLocation: LocationProps | undefined;
    setNewMeetingLocation: SetState<LocationProps | undefined>;
  }) => {
    const [center, setCenter] = useState(DEFAULT_POSITION);
    const [travelMode] = useState('TRANSIT' as TravelMode);
    const [directionsResult, setDirectionsResult] = useState([] as DirectionsResult[]);

    useEffect(() => {
      setInitialMapCenter(setCenter, existingMeetingLocation);
    }, [existingMeetingLocation]);

    const originsToFinalDestination = useMemo(
      () =>
        mapOriginsToFinalDestination({ existingOrigins, participantOrigin, newMeetingLocation, setNewMeetingLocation }),
      [existingOrigins, participantOrigin, newMeetingLocation]
    );

    return (
      <>
        {existingMeetingLocation && (
          <>
            <h4>
              So far, the most optimal meeting point for your group is {existingMeetingLocation.lat}{' '}
              {existingMeetingLocation.lng}
            </h4>
          </>
        )}
        <GoogleMap
          options={{ styles: mapStyles }}
          clickableIcons
          mapContainerStyle={containerStyle}
          center={center}
          zoom={ZOOM}
        >
          {!directionsResult.length &&
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
      </>
    );
  }
);
