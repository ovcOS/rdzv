type Id = typeof ObjectId;

declare type RoomProps = {
  _id: Id;
  name: string;
  slug: string;
  participants: ParticipantProps[];
  transportationMode: TravelMode;
  meetingLocation?: LocationProps;
};

declare type TravelMode = google.maps.TravelMode;

declare type LocationProps = {
  lat: number;
  lng: number;
};

declare type ParticipantProps = {
  id: Id;
  name: string;
  location: LocationProps;
  route?: ParticipantRouteProps;
};
