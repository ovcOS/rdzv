export const mapOriginsToFinalDestination = (
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
