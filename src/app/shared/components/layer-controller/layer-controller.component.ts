import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-layer-controller',
  templateUrl: './layer-controller.component.html',
  styleUrls: ['./layer-controller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayerControllerComponent implements OnInit {
  @Input() names: string[] = [];
  @Input() disabled = false;
  @Output() layerSelected = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}
}
