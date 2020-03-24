export interface CountryInfo {
  country: string;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  countryInfo: {
    iso2: string;
    iso3: string;
    _id: number;
    lat: number;
    long: number;
    flag: string; // url
  };
}
