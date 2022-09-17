import { Map } from '../components';

const existingOriginsTest = [
  { lat: 47.5595986, lng: 7.5885761 }, // basel
  { lat: 45.4642035, lng: 9.189982 }, // milano
];

const existingMeetingLocation = {
  lat: 46.511901050000006,
  lng: 8.38927905,
};

const MapPage = () => <Map existingMeetingLocation={existingMeetingLocation} existingOrigins={existingOriginsTest} />;

export default MapPage;
