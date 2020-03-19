import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MAP_CONTAINER_NAME } from '@shared/models/constant';
import { MapService } from '@shared/services';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [
    {
      provide: MAP_CONTAINER_NAME,
      useValue: 'mapContainer'
    },
    MapService]
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor (private mapInstance: MapService) {
  }

  ngOnInit (): void {
  }

  ngAfterViewInit (): void {
    this.mapInstance.buildMap();
  }
}
