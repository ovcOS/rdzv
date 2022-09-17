type Id = typeof ObjectId;

declare type RoomProps = {
  _id: Id;
  name: string;
  slug: string;
  participants: ParticipantProps[];
  transportationMode: TransportationMode;
  meetingLocation?: LocationProps;
};

declare type TransportationMode = 'public' | 'walking' | 'car' | 'bike';

declare type LocationProps = {
  lat: number;
  lng: number;
};

declare type ParticipantProps = {
  _id: Id;
  name: string;
  location: LocationProps;
  route?: ParticipantRouteProps;
};
