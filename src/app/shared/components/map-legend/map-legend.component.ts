import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MapLayerConfig } from '@core/models';

@Component({
  selector: 'app-map-legend',
  templateUrl: './map-legend.component.html',
  styleUrls: ['./map-legend.component.scss'],
})
export class MapLegendComponent implements OnInit, OnChanges {
  @Input() thresholds: {
    label: string;
    level: MapLayerConfig;
    alpha: number;
  }[];
  @Input() layerColor: {
    label: string;
    color: string;
  };

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.thresholds) {
      console.log(this.thresholds);
    }
  }
}
