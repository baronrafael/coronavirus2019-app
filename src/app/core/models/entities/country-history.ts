type HistoricalData = Record<string, number>;

export interface CountryHistory {
  country: string;
  province: 'mainland'[];
  timeline: {
    cases: HistoricalData;
    deaths: HistoricalData;
    recovered: HistoricalData;
  };
}
