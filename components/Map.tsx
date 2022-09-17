import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  Autocomplete,
} from '@react-google-maps/api';

type SetState<T> = Dispatch<SetStateAction<T>>;
type PlaceResult = google.maps.places.PlaceResult;
type AutocompleteProps = google.maps.places.Autocomplete;
type DirectionsResult = google.maps.DirectionsResult;
type DirectionsStatus = google.maps.DirectionsStatus;
type Position = { lat: number; lng: number };

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

const getPositionFromPlaceResult = (placeResult: PlaceResult): Position | null => {
  const lat = placeResult.geometry?.location?.lat();
  const lng = placeResult.geometry?.location?.lng();
  if (!lat || !lng) return null;
  return { lat, lng };
};

const onLoad = (autocompleteInstance: AutocompleteProps, setAutocomplete: SetState<AutocompleteProps | null>) => {
  if (!autocompleteInstance) return;
  setAutocomplete(autocompleteInstance);
};

const onPlaceChanged = (autocomplete: AutocompleteProps | null, setSelectedDestination: SetState<Position | null>) => {
  if (!autocomplete) return;
  const place = autocomplete.getPlace();
  const position = getPositionFromPlaceResult(place);
  setSelectedDestination(position);
};

export const Map = React.memo(() => {
  const [center, setCenter] = useState(defaultPosition);
  const [origin, setSelectedOrigin] = useState(defaultPosition);
  const [destination, setSelectedDestination] = useState(null as Position | null);
  const [autocomplete, setAutocomplete] = useState(null as AutocompleteProps | null);
  // for now only using transit as travel mode
  const [travelMode, setTravelMode] = useState('TRANSIT' as TravelMode);
  const [directionsResult, setDirectionsResult] = useState(null as DirectionsResult | null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(currentPosition);
          setSelectedOrigin(currentPosition);
        },
        () => {
          console.log('error!!');
        }
      );
    } else {
      console.error('geolocation not supported');
    }
  }, []);

  const directionsServiceCallback = (result: DirectionsResult | null, status: DirectionsStatus) => {
    if (!result) return;
    if (status === 'OK') {
      setDirectionsResult(result);
    } else {
      console.error('uh oh, something went wrong', { result });
    }
  };

  return (
    <LoadScript libraries={LIBRARIES} googleMapsApiKey="AIzaSyDEq9i1TN3va9qFrydwl-0TfbpLmhb_FxQ">
      <div className="d-block" style={{ height: '50px' }}>
        <Autocomplete
          onLoad={(instance) => onLoad(instance, setAutocomplete)}
          onPlaceChanged={() => onPlaceChanged(autocomplete, setSelectedDestination)}
        >
          <input type="text" placeholder="Where do you want to go?" style={autoCompleteStyle} />
        </Autocomplete>
      </div>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={ZOOM}>
        {!!(origin && destination && !directionsResult) && (
          <DirectionsService
            options={{ destination: destination, origin, travelMode }}
            callback={(result, status) => directionsServiceCallback(result, status)}
          />
        )}
        {!!directionsResult && (
          <DirectionsRenderer
            options={{
              directions: directionsResult,
            }}
          />
        )}
        <Marker position={origin} onPositionChanged={() => console.log('marker position changed', origin)} visible />
      </GoogleMap>
    </LoadScript>
  );
});
