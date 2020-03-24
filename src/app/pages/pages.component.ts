import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { InfoDrawerService } from '@shared/services/info-drawer.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesComponent implements OnInit {
  constructor(public infoDrawer: InfoDrawerService) {}

  ngOnInit(): void {}
}
