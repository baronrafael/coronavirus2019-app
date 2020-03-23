import {
  ColorConfig,
  LayerNames,
  TresholdConfig,
  TresholdNames,
} from '@core/models';

export const MAP_LAYERS_TRESHOLD_CONFIG: TresholdConfig = {
  [TresholdNames.LOW]: {
    level: [0, 500],
    alpha: 0.35,
  },
  [TresholdNames.MEDIUM]: {
    level: [500, 1000],
    alpha: 0.5,
  },
  [TresholdNames.HIGH]: {
    level: [1000, 5000],
    alpha: 0.75,
  },
  [TresholdNames.VERY_HIGH]: {
    level: [5000, Infinity],
    alpha: 1,
  },
};

export const LAYER_COLORS: ColorConfig = {
  [LayerNames.RECOVERIES]: '#1B5E20',
  [LayerNames.INFECTED]: '#FBC02D',
  [LayerNames.CRITICAL]: '#E65100',
  [LayerNames.DEATHS]: '#B71C1C',
};
