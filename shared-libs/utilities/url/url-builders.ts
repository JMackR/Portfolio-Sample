const GOOGLE_MAP_BASE_URL = 'https://www.google.com/maps/search/?api=1&query='

export const buildGoogleMapsURLForLocation = (latitude: number, longitude: number) => {
  return `${GOOGLE_MAP_BASE_URL}${latitude},${longitude}&zoom=11`
}
