import { LayerNames } from '@core/models';

export interface MapInfoLayer {
  label: LayerNames;
  color: string;
  featureLayers: Array<{ features: GeoJSON.FeatureCollection; alpha: number }>;
}

export interface MapInfoLayers extends Record<LayerNames, MapInfoLayer> {}

// This way so the typescript compiler does not complain
// See: https://github.com/microsoft/TypeScript/issues/24220#issuecomment-549814653
export type LayerCountryInfo = Partial<{ [key in LayerNames]: number }> & {
  country: string;
};
