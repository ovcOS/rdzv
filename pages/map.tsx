import { Map } from '../components';

const existingOriginsTest = [
  { lat: 47.5595986, lng: 7.5885761 }, // basel
  { lat: 45.4642035, lng: 9.189982 }, // milano
];

const MapPage = () => <Map existingOrigins={existingOriginsTest} />;

export default MapPage;
