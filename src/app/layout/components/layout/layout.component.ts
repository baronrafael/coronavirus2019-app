import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InfoDrawerService } from '@core/services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  constructor(public infoDrawer: InfoDrawerService, private router: Router) {}

  ngOnInit(): void {}

  get showInfo() {
    return this.router.url === '/';
  }
}
