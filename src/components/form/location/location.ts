import { Country, IPLookupResponse } from "./types";

export function getLocalCoordinates() {
  let location: GeolocationPosition | GeolocationPositionError;
  navigator.geolocation.getCurrentPosition(
    (position) => {
      location = position;
    },
    (error) => {
      location = error;
    },
  );
  // @ts-expect-error
  return location;
}

export async function getCurrentCountry() {
  try {
    return await fetch("http://ip-api.com/json")
      .then((response) => response.json())
      .then((data: IPLookupResponse) => data);
  } catch (error) {
    throw error;
  }
}

export function getCountries() {
  return fetch("https://restcountries.com/v3.1/all").then((response) =>
    response
      .json()
      .then((data: Country[]) =>
        data.filter((item) => {
          return item;
        }),
      )
      .catch((err) => {
        // console.log("error getting countries ", err.message);
        throw err;
      }),
  );
}
