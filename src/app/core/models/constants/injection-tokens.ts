import { InjectionToken } from '@angular/core';

export const HOST_TOKEN = new InjectionToken<string>('Hopst');

export const NOVEL_COVID_SERVICE = new InjectionToken<string>(
  'Novel Covid Api Service',
);

export const MAPBOX_DATASET_API_SERVICE = new InjectionToken<string>(
  'Mapbox Dataset Api service',
);
