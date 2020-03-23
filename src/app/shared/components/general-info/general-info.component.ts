import { Component, Input, OnInit } from '@angular/core';
import { CountryInfo, GeneralInfo, HomeSummary } from '@core/models';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
})
export class GeneralInfoComponent implements OnInit {
  @Input() generalInfo: Readonly<GeneralInfo>;
  @Input() summary: Readonly<HomeSummary>;
  @Input() currentCountry: Readonly<CountryInfo>;

  constructor() {}

  ngOnInit(): void {}
}
