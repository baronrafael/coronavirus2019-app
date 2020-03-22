import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapboxDatasetService {
  private readonly baseUrl: string;

  constructor(private api: ApiService) {
    this.baseUrl = environment.mapBox.urls.datasets;
  }

  fetchDataset(
    datasetId: string,
    username: string,
  ): Observable<GeoJSON.FeatureCollection> {
    return this.api.get<GeoJSON.FeatureCollection>(
      `${this.baseUrl}/${username}/${datasetId}`,
    );
  }

  fetchDatasetFeatures(
    datasetId: string,
    username: string,
  ): Observable<GeoJSON.FeatureCollection> {
    return this.api.get<GeoJSON.FeatureCollection>(
      `${this.baseUrl}/${username}/${datasetId}/features`,
    );
  }
}
