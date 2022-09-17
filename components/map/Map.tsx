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
} from './lib';

export const Map = React.memo(
  ({
    participantOrigin,
    existingOrigins = [],
    existingMeetingLocation,
  }: {
    participantOrigin: LocationProps | null;
    existingMeetingLocation?: LocationProps;
    existingOrigins?: LocationProps[];
  }) => {
    const [center, setCenter] = useState(DEFAULT_POSITION);
    const [travelMode] = useState('TRANSIT' as TravelMode);
    const [directionsResult, setDirectionsResult] = useState([] as DirectionsResult[]);

    useEffect(() => {
      setInitialMapCenter(setCenter, existingMeetingLocation);
    }, [existingMeetingLocation]);

    // if the first origin is set by the current user, display a message telling them
    // a route will be defined once more people define their origin

    const originsToFinalDestination = useMemo(
      () => mapOriginsToFinalDestination(existingOrigins, participantOrigin),
      [existingOrigins, participantOrigin]
    );

    return (
      <>
        {existingMeetingLocation && (
          <>
            <h4>So far, the most optimal meeting point for your group is {existingMeetingLocation.lat}</h4>
          </>
        )}
        <GoogleMap
          options={{ styles: mapStyles }}
          clickableIcons
          mapContainerStyle={containerStyle}
          center={center}
          zoom={ZOOM}
        >
          {!!(participantOrigin && !directionsResult.length) &&
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
