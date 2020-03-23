import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MapInfoLayer } from '@core/models';

@Component({
  selector: 'app-map-info-layer',
  templateUrl: './map-info-layer.component.html',
  styleUrls: ['./map-info-layer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapInfoLayerComponent implements OnInit {
  @Input() layer: Readonly<MapInfoLayer>;
  @Input() before = '';

  constructor() {}

  ngOnInit(): void {}
}
