// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mapBox: {
    username: 'alessandrojcm',
    token:
      'pk.eyJ1IjoiYWxlc3NhbmRyb2pjbSIsImEiOiJjazgzbWw3MmMwMHluM2VtcmxoeWUwOW5iIn0.e6bdqayMgiuERemkcfWyWg',
    geoJsonSource:
      'https://raw.githubusercontent.com/bsrweb/geo-json-countries-mapbox/master/countries/all-countries.json',
    urls: {
      datasets: 'https://api.mapbox.com/datasets/v1',
    },
  },
  novelCovidUrl: ' https://corona.lmao.ninja/v2',
  mapBackgroundColor: '#f5f5f5',
  mapFillColor: '#000000',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
