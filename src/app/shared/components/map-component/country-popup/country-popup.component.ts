import { Component, Input, OnInit } from '@angular/core';
import { CountryInfo } from '@core/models';
import { LngLatLike } from 'mapbox-gl';

@Component({
  selector: 'app-country-popup',
  templateUrl: './country-popup.component.html',
  styleUrls: ['./country-popup.component.scss'],
})
export class CountryPopupComponent implements OnInit {
  @Input() countryInfo: Readonly<CountryInfo & { position: LngLatLike }>;

  constructor() {}

  ngOnInit(): void {}
}
