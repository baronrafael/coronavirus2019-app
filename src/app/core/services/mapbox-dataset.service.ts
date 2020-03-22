import { Inject, Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Observable } from 'rxjs';
import { MAPBOX_DATASET_API_SERVICE } from '@core/models/constants';

@Injectable({
  providedIn: 'root',
})
export class MapboxDatasetService {
  constructor(@Inject(MAPBOX_DATASET_API_SERVICE) private api: ApiService) {}

  fetchDataset(
    datasetId: string,
    username: string,
  ): Observable<GeoJSON.FeatureCollection> {
    return this.api.get<GeoJSON.FeatureCollection>(`${username}/${datasetId}`);
  }

  fetchDatasetFeatures(
    datasetId: string,
    username: string,
  ): Observable<GeoJSON.FeatureCollection> {
    return this.api.get<GeoJSON.FeatureCollection>(
      `${username}/${datasetId}/features`,
    );
  }
}
