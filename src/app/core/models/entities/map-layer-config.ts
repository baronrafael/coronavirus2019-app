import { LayerNames } from '@core/models';

export type MapLayerConfig = number[];

export enum TresholdNames {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  VERY_HIGH = 'Very High',
}

export type TresholdConfig = Record<
  TresholdNames,
  { level: MapLayerConfig } & { alpha: number }
>;

export type ColorConfig = Partial<{ [key in LayerNames]: string }>;
