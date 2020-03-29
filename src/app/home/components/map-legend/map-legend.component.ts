import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MapLayerConfig } from '@core/models';

@Component({
  selector: 'app-map-legend',
  templateUrl: './map-legend.component.html',
  styleUrls: ['./map-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapLegendComponent implements OnInit {
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
}
