import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import { Button } from '@mui/material';
import { useMemo } from 'react';

type SetState<T> = Dispatch<SetStateAction<T>>;
type PlaceResult = google.maps.places.PlaceResult;
type AutocompleteProps = google.maps.places.Autocomplete;
type DirectionsResult = google.maps.DirectionsResult;
type DirectionsStatus = google.maps.DirectionsStatus;

const LIBRARIES: ['places'] = ['places'];

const ZOOM = 12;
const autoCompleteStyle = {
  boxSizing: `border-box` as const,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  padding: `0 12px`,
  borderRadius: `3px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
  position: 'absolute' as const,
  left: '50%',
  marginLeft: '-120px',
};

// const defaultPosition: Position = { lat: 47.381569, lng: 8.513589 }; // zurich
const defaultPosition = { lat: 41.410215, lng: 2.137214 }; // barcelona

const containerStyle = {
  width: '500px',
  height: '500px',
};

const getLocationFromPlaceResult = (placeResult: PlaceResult): LocationProps | null => {
  const lat = placeResult.geometry?.location?.lat();
  const lng = placeResult.geometry?.location?.lng();
  if (!lat || !lng) return null;
  return { lat, lng };
};

const onLoad = (autocompleteInstance: AutocompleteProps, setAutocomplete: SetState<AutocompleteProps | null>) => {
  if (!autocompleteInstance) return;
  setAutocomplete(autocompleteInstance);
};

const onPlaceChanged = (autocomplete: AutocompleteProps | null, setSelectedOrigin: SetState<LocationProps | null>) => {
  if (!autocomplete) return;
  const place = autocomplete.getPlace();
  const location = getLocationFromPlaceResult(place);
  setSelectedOrigin(location);
};

const setInitialCenter = (setCenter: SetState<LocationProps>, initialLocation?: LocationProps) => {
  if (initialLocation) {
    setCenter(initialLocation);
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCenter(currentPosition);
      },
      () => {
        console.log('error!!');
      }
    );
  } else {
    console.error('geolocation not supported');
  }
};

const setCurrentLocationAsOrigin = (stateSetter: SetState<LocationProps | null>) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        stateSetter(currentPosition);
      },
      () => {
        console.log('error!!');
      }
    );
  } else {
    console.error('geolocation not supported');
  }
};

const mapOriginsToFinalDestination = (
  existingOrigins: LocationProps[],
  origin: LocationProps | null
): { origin: LocationProps; destination: LocationProps }[] => {
  const allOrigins = [...existingOrigins, ...(origin ? [origin] : [])];
  const finalDestination = allOrigins.reduce(
    (res, location, index, original) => {
      const { length } = original;
      const { lat, lng } = location;
      const { lat: existingLat, lng: existingLng } = res;
      if (index + 1 === length) {
        return { lat: (existingLat + lat) / length, lng: (existingLng + lng) / length };
      }
      return { lat: existingLat + lat, lng: existingLng + lng };
    },
    { lat: 0, lng: 0 }
  );
  return allOrigins.map((v) => ({ origin: v, destination: finalDestination }));
};

export const Map = React.memo(
  ({
    existingOrigins = [],
    existingMeetingLocation,
  }: {
    existingMeetingLocation?: LocationProps;
    existingOrigins?: LocationProps[];
  }) => {
    const [center, setCenter] = useState(defaultPosition);
    const [origin, setSelectedOrigin] = useState(null as LocationProps | null);
    const [autocomplete, setAutocomplete] = useState(null as AutocompleteProps | null);
    // for now only using transit as travel mode
    const [travelMode, setTravelMode] = useState('TRANSIT' as TransportationMode);
    const [directionsResult, setDirectionsResult] = useState([] as DirectionsResult[]);

    useEffect(() => {
      setInitialCenter(setCenter, existingMeetingLocation);
    }, [existingMeetingLocation]);

    const directionsServiceCallback = (result: DirectionsResult | null, status: DirectionsStatus) => {
      if (!result) return;
      if (status === 'OK') {
        setDirectionsResult((existingResults) => [...existingResults, result]);
      } else {
        console.error('uh oh, something went wrong', { result });
      }
    };
    // if the first origin is set by the current user, display a message telling them
    // a route will be defined once more people define their origin

    const originsToFinalDestination = useMemo(
      () => mapOriginsToFinalDestination(existingOrigins, origin),
      [existingOrigins, origin]
    );
    console.log({ origin, originsToFinalDestination, directionsResult });

    return (
      <LoadScript libraries={LIBRARIES} googleMapsApiKey="AIzaSyDEq9i1TN3va9qFrydwl-0TfbpLmhb_FxQ">
        <div className="d-flex flex-column" style={{ minHeight: '120px' }}>
          <div>Where are you coming from?</div>
          <div className="d-flex">
            <Button color="primary" onClick={() => setCurrentLocationAsOrigin(setSelectedOrigin)}>
              Current location
            </Button>
            or
            <Autocomplete
              onLoad={(instance) => onLoad(instance, setAutocomplete)}
              onPlaceChanged={() => onPlaceChanged(autocomplete, setSelectedOrigin)}
            >
              <input type="text" placeholder="Type a location" style={autoCompleteStyle} />
            </Autocomplete>
          </div>
        </div>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={ZOOM}>
          {!!(originsToFinalDestination.length && !directionsResult.length) &&
            originsToFinalDestination.map(({ origin, destination }, i) => (
              <DirectionsService
                key={`${origin.lat}-${i}`}
                options={{ destination, origin, travelMode }}
                callback={directionsServiceCallback}
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
